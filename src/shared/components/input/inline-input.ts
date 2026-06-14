import { Block } from "../block";
import template from "./input.hbs?raw";
import { type InputProps } from "./types";
import { registerComponent } from "@/shared/utils/templates";
import "./styles.scss";
import "./inline-input.scss";

export class InlineInput extends Block<InputProps> {
    static componentName = "InlineInput";

    protected override template = template;

    constructor(props: InputProps) {
        super(props);
        this.setProps({ variantClassName: "inline-input" });
    }
}

registerComponent(InlineInput);
