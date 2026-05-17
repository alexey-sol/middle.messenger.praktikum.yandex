import authFormTemplate from "./auth-form.hbs?raw";
import { Form, type FormProps } from "@/shared/components/form";
import { registerComponent } from "@/shared/utils/templates";

export class AuthForm extends Form<FormProps> {
    static componentName = "AuthForm";

    protected override template = authFormTemplate;
}

registerComponent(AuthForm);
