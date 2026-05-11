import Handlebars from "handlebars";

export type BlockOwnProps = Object & {
    __children?: Array<{
        component: Block<object>;
        embed: (node: DocumentFragment) => void;
    }>;
    __refs?: Record<string, Element>;
};

type EventListType = Partial<Record<keyof HTMLElementEventMap, (e: Event) => void>>;

export abstract class Block<Props extends BlockOwnProps = {}> {
    protected children: Array<Block<BlockOwnProps>> = [];

    protected events: EventListType = {};

    protected props: Partial<Props> = {};

    protected refs: Record<string, Element> = {};

    protected abstract template: string;

    private domElement: Element | null = null;

    constructor(props: Props = {} as Props) {
        this.props = props;
    }

    public element(): Element | null {
        if (!this.domElement) {
            this.render();
        }

        return this.domElement;
    }

    public setProps(props: Partial<Props>) {
        this.props = { ...this.props, ...props, __children: [], __refs: {} };
        this.render();
    }

    protected componentDidMount() {}

    protected componentWillUnmount() {}

    protected render() {
        this.unmountComponent();
        const fragment = this.compile();

        if (this.domElement && fragment) {
            this.domElement.replaceWith(fragment);
        }

        this.domElement = fragment;
        this.mountComponent();
    }

    private attachListeners() {
        // eslint-disable-next-line guard-for-in
        for (const eventName in this.events) {
            const eventCallback = this.events[eventName as keyof HTMLElementEventMap];
            if (typeof eventCallback === "function" && this.domElement) {
                this.domElement.addEventListener(eventName, eventCallback);
            }
        }
    }

    private compile() {
        const html = Handlebars.compile(this.template)(this.props);

        const templateElement = document.createElement("template");
        templateElement.innerHTML = html;
        const fragment = templateElement.content;

        if (this.props.__children) {
            this.children = this.props.__children.map((child) => child.component);

            this.props.__children.forEach((child) => {
                child.embed(fragment);
            });
        }

        const defaultRefs: BlockOwnProps["__refs"] = this.props?.__refs ?? {};

        this.refs = Array.from(fragment.querySelectorAll("[ref]")).reduce((list, element) => {
            const key = element.getAttribute("ref") as string;
            list[key] = element;
            element.removeAttribute("ref");
            return list;
        }, defaultRefs);

        return templateElement.content.firstElementChild;
    }

    private mountComponent() {
        this.attachListeners();
        this.componentDidMount();
    }

    private removeListeners() {
        // eslint-disable-next-line guard-for-in
        for (const eventName in this.events) {
            const eventCallback = this.events[eventName as keyof HTMLElementEventMap];
            if (typeof eventCallback === "function" && this.domElement) {
                this.domElement.removeEventListener(eventName, eventCallback);
            }
        }
    }

    private unmountComponent() {
        if (this.domElement) {
            this.children.toReversed().forEach((child) => child.unmountComponent());
            this.componentWillUnmount();
            this.removeListeners();
        }
    }
}
