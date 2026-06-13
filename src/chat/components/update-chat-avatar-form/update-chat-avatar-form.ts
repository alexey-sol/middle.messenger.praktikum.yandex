import { connect } from "@/app/store/store";
import { type MessengerState } from "@/chat/types";
import { Form } from "@/shared/components/form";
import { type UpdateAvatarFormProps } from "@/shared/components/update-avatar-form/types";
import template from "@/shared/components/update-avatar-form/update-avatar-form.hbs?raw";
import "@/shared/components/update-avatar-form/update-avatar-form.scss";
import { getFileUrl } from "@/shared/utils/helpers";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";

Handlebars.registerHelper("getFileUrl", getFileUrl);

export class UpdateChatAvatarForm extends Form<UpdateAvatarFormProps> {
    static componentName = "UpdateChatAvatarForm";

    protected override template = template;
}

const mapStateToProps = (state: MessengerState) => {
    return {
        onChange: state.messenger?.form?.updateChatAvatar?.onChange,
        onSubmit: state.messenger?.form?.updateChatAvatar?.onSubmit,
    };
};

registerComponent(connect(mapStateToProps)(UpdateChatAvatarForm));
