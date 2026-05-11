import { Block } from "../block";
import buttonTemplate from "./button.hbs?raw";
import { registerComponent } from "@/shared/utils/templates";
import "./button.scss";

export type ButtonProps = Pick<HTMLButtonElement, "disabled" | "type"> & {
    theme?: "primary" | "secondary";
    title: string;
    to?: string;
};

export class Button extends Block<ButtonProps> {
    protected override template = buttonTemplate;
}

registerComponent(Button);
