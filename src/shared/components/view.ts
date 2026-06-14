import { NoViewElementFoundError } from "../utils/errors";
import { insertElement } from "../utils/helpers";
import { Block, type BlockOwnProps } from "./block";
import "@/shared/layouts/app.scss";

export abstract class View<P extends BlockOwnProps> extends Block<P> {
    static componentName = "";

    public hide() {
        const viewElement = this.element();

        if (!viewElement) {
            throw new NoViewElementFoundError(View.componentName);
        }

        viewElement.remove();
    }

    public show() {
        const viewElement = this.element();

        if (!viewElement) {
            throw new NoViewElementFoundError(View.componentName);
        }

        insertElement(viewElement);
    }
}
