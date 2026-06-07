import template from "./profile-form.hbs?raw";
import { connect } from "@/app/store/store";
import { type SettingsMode, type SettingsState } from "@/profile/types";
import { Form, type FormProps } from "@/shared/components/form";
import { getResourceUrl } from "@/shared/utils/helpers";
import { registerComponent } from "@/shared/utils/templates";
import "@/shared/components/input/inline-input";
import Handlebars from "handlebars";

Handlebars.registerHelper("getResourceUrl", getResourceUrl);

type ProfileFormProps = Pick<FormProps, "onSubmit"> & {
    handleUpdatePassword: FormProps["onSubmit"];
    handleUpdateUser: FormProps["onSubmit"];
    mode: Extract<SettingsMode, "password-edit" | "settings-edit">;
};

export class ProfileForm extends Form<ProfileFormProps> {
    static componentName = "ProfileForm";

    protected override template = template;

    constructor(props: ProfileFormProps) {
        super(props);
        this.setProps({
            onSubmit:
                props.mode === "settings-edit"
                    ? props.handleUpdateUser
                    : props.handleUpdatePassword,
        });
    }
}

const mapStateToProps = (state: SettingsState) => {
    return {
        handleUpdatePassword: state.settings?.form?.updatePassword?.onSubmit,
        handleUpdateUser: state.settings?.form?.updateUser?.onSubmit,
    };
};

registerComponent(connect(mapStateToProps)(ProfileForm));
