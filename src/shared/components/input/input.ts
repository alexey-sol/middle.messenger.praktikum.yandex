import { Block } from "../block";
import inputTemplate from "./input.hbs?raw";
import { type InputProps } from "./types";
import "./input.scss";
import { registerComponent } from "@/shared/utils/templates";

export class Input extends Block<InputProps> {
    protected override template = inputTemplate;
}

registerComponent(Input);
