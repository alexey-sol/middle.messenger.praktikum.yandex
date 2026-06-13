import { Block } from "../block";
import buttonTemplate from "./button.hbs?raw";
import { registerComponent } from "@/shared/utils/templates";
import "./button.scss";

export type ButtonProps = Pick<HTMLButtonElement, "disabled" | "form" | "type"> & {
    dataCase?: string;
    theme?: "primary" | "secondary";
    title: string;
    to?: string;
};

export class Button extends Block<ButtonProps> {
    static componentName = "Button";

    protected override template = buttonTemplate;
}

registerComponent(Button);
