import sendMessageFormTemplate from "./send-message-form.hbs?raw";
import dropdown from "@/shared/components/dropdown/dropdown.hbs?raw";
import { Form, type FormProps } from "@/shared/components/form";
import { type DropdownItem } from "@/shared/types";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";
import "./send-message-form.scss";

Handlebars.registerPartial("dropdown", dropdown);

type SendMessageFormProps = FormProps & {
    attachDropdownItems: DropdownItem[];
};

export class SendMessageForm extends Form<SendMessageFormProps> {
    static componentName = "SendMessageForm";

    protected override template = sendMessageFormTemplate;
}

registerComponent(SendMessageForm);
