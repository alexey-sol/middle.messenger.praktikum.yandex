import profileFormTemplate from "./profile-form.hbs?raw";
import { Form, type FormProps } from "@/shared/components/form";
import { registerComponent } from "@/shared/utils/templates";

export class ProfileForm extends Form<FormProps> {
    static componentName = "ProfileForm";

    protected override template = profileFormTemplate;
}

registerComponent(ProfileForm);
