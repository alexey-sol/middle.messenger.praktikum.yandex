import template from "./update-user-avatar-form.hbs?raw";
import { connect } from "@/app/store/store";
import { type SettingsViewProps } from "@/profile/controllers/settings";
import { type SettingsState } from "@/profile/types";
import { Form, type FormProps } from "@/shared/components/form";
import { getFileUrl } from "@/shared/utils/helpers";
import "./update-user-avatar-form.scss";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";

Handlebars.registerHelper("getFileUrl", getFileUrl);

export type UpdateUserAvatarFormProps = Pick<FormProps, "onSubmit"> &
    Pick<SettingsViewProps, "avatarFile">;

export class UpdateUserAvatarForm extends Form<UpdateUserAvatarFormProps> {
    static componentName = "UpdateUserAvatarForm";

    protected override template = template;
}

const mapStateToProps = (state: SettingsState) => {
    return {
        onChange: state.settings?.form?.updateUserAvatar?.onChange,
        onSubmit: state.settings?.form?.updateUserAvatar?.onSubmit,
    };
};

registerComponent(connect(mapStateToProps)(UpdateUserAvatarForm));
