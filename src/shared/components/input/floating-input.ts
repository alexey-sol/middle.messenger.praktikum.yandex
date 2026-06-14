import { Block } from "../block";
import template from "./input.hbs?raw";
import { type InputProps } from "./types";
import { registerComponent } from "@/shared/utils/templates";
import "./styles.scss";
import "./floating-input.scss";

export class FloatingInput extends Block<InputProps> {
    static componentName = "FloatingInput";

    protected override template = template;

    constructor(props: InputProps) {
        super(props);
        this.setProps({ variantClassName: "floating-input" });
    }
}

registerComponent(FloatingInput);
