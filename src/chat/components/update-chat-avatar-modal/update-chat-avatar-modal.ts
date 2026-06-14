import template from "./update-chat-avatar-modal.hbs?raw";
import "@/shared/components/button/button";
import { Block } from "@/shared/components/block";
import { type UpdateAvatarFormProps } from "@/shared/components/update-avatar-form/types";
import "@/styles/modal.scss";
import "../update-chat-avatar-form/update-chat-avatar-form";
import { registerComponent } from "@/shared/utils/templates";

export type UpdateChatModalProps = Pick<UpdateAvatarFormProps, "avatarFile"> & {
    isOpen?: boolean;
};

export class UpdateChatAvatarModal extends Block<UpdateChatModalProps> {
    static componentName = "UpdateChatAvatarModal";

    protected override template = template;
}

registerComponent(UpdateChatAvatarModal);
