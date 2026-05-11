import sendMessageFormTemplate from "./send-message-form.hbs?raw";
import { Block } from "@/shared/components/block";
import "./send-message-form.scss";
import dropdown from "@/shared/components/dropdown/dropdown.hbs?raw";
import { type DropdownItem } from "@/shared/types";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";

Handlebars.registerPartial("dropdown", dropdown);

type SendMessageFormProps = {
    attachDropdownItems: DropdownItem[];
};

export class SendMessageForm extends Block<SendMessageFormProps> {
    protected override template = sendMessageFormTemplate;
}

registerComponent(SendMessageForm);
