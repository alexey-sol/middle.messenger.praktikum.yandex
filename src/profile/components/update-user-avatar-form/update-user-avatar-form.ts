import { connect } from "@/app/store/store";
import { type SettingsState } from "@/profile/types";
import { Form } from "@/shared/components/form";
import { type UpdateAvatarFormProps } from "@/shared/components/update-avatar-form/types";
import template from "@/shared/components/update-avatar-form/update-avatar-form.hbs?raw";
import "@/shared/components/update-avatar-form/update-avatar-form.scss";
import { getFileUrl } from "@/shared/utils/helpers";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";

Handlebars.registerHelper("getFileUrl", getFileUrl);

export class UpdateUserAvatarForm extends Form<UpdateAvatarFormProps> {
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
