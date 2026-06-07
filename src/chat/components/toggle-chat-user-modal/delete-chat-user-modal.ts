import deleteChatUserModalTemplate from "./delete-chat-user-modal.hbs?raw";
import "@/shared/components/button/button";
import { type ToggleChatUserModalProps } from "./types";
import "../toggle-chat-user-form/delete-chat-user-form";
import { Block } from "@/shared/components/block";
import "@/styles/modal.scss";
import { registerComponent } from "@/shared/utils/templates";

export class DeleteChatUserModal extends Block<ToggleChatUserModalProps> {
    static componentName = "DeleteChatUserModal";

    protected override template = deleteChatUserModalTemplate;
}

registerComponent(DeleteChatUserModal);
