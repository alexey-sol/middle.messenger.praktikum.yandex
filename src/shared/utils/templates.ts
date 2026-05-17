import { type Block } from "../components/block";
import Handlebars, { type HelperOptions } from "handlebars";

let uniqueId = 0;

type BlockConstructor<P extends {}> = {
    new (props: P): Block<P>;
    componentName: string;
};

export const registerComponent = <P extends {}>(Component: BlockConstructor<P>) => {
    Handlebars.registerHelper(
        Component.componentName,
        function (this: unknown, { data, hash: props }: HelperOptions) {
            const dataAttribute = `data-component-hbs-id="${++uniqueId}"`;
            const component = new Component(props as P);

            if ("ref" in props) {
                // eslint-disable-next-line canonical/id-match
                (data.root.__refs = data.root.__refs || {})[props.ref] = component.element();
            }

            // eslint-disable-next-line canonical/id-match
            (data.root.__children = data.root.__children || []).push({
                component,
                embed(node: DocumentFragment) {
                    const placeholder = node.querySelector(`[${dataAttribute}]`);
                    if (!placeholder) {
                        throw new Error(
                            `Can't find data-id for component ${Component.componentName}`,
                        );
                    }

                    const element = component.element();

                    if (element) {
                        placeholder.replaceWith(element);
                    }
                },
            });

            return `<div ${dataAttribute}></div>`;
        },
    );
};
