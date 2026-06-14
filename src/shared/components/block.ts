import Handlebars from "handlebars";

export type BlockConstructor<P extends BlockOwnProps> = new (props: P) => Block<P>;

export type BlockOwnProps = Object & {
    __children?: Array<{
        component: Block<object>;
        embed: (node: DocumentFragment) => void;
    }>;
    __refs?: Record<string, Element>;
};

export type MapEventNameToListenerArgs = Partial<{
    [K in keyof HTMLElementEventMap]: {
        listener?: (event: HTMLElementEventMap[K]) => void;
        useCapture?: boolean;
    };
}>;

export abstract class Block<Props extends BlockOwnProps = {}> {
    static componentName: string;

    protected children: Array<Block<BlockOwnProps>> = [];

    protected events: MapEventNameToListenerArgs = {};

    protected props: Partial<Props> = {};

    protected refs: Record<string, Element> = {};

    protected abstract template: string;

    private domElement: Element | null = null;

    private isMounted = false;

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

    protected unmountComponent() {
        if (this.domElement) {
            this.children.toReversed().forEach((child) => child.unmountComponent());
            this.componentWillUnmount();
            this.removeListeners();

            this.isMounted = true;
        }
    }

    private attachListeners() {
        for (const key in this.events) {
            if (!Object.hasOwn(this.events, key)) {
                continue;
            }

            const eventName = key as keyof MapEventNameToListenerArgs;
            const args = this.events[eventName];

            if (args && this.domElement) {
                this.domElement.addEventListener(
                    eventName,
                    args.listener as EventListener,
                    args.useCapture,
                );
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

        if (!this.isMounted) {
            this.componentDidMount();
            this.isMounted = true;
        }
    }

    private removeListeners() {
        for (const eventName in this.events) {
            if (!Object.hasOwn(this.events, eventName)) {
                continue;
            }

            const args = this.events[eventName as keyof HTMLElementEventMap];

            if (typeof args?.listener === "function" && this.domElement) {
                this.domElement.removeEventListener(
                    eventName,
                    args?.listener as EventListener,
                    args.useCapture,
                );
            }
        }
    }
}
