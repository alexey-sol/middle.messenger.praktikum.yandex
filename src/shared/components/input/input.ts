import { Block } from "../block";
import inputTemplate from "./input.hbs?raw";
import { type InputProps } from "./types";
import { registerComponent } from "@/shared/utils/templates";
import "./styles.scss";

export class Input extends Block<InputProps> {
    static componentName = "Input";

    protected override template = inputTemplate;

    protected override componentDidMount(): void {
        switch (this.props.variant) {
            case "inline":
                import("./inline-input.scss");
                break;
            case "floating":
            default:
                import("./floating-input.scss");
        }
    }
}

registerComponent(Input);
