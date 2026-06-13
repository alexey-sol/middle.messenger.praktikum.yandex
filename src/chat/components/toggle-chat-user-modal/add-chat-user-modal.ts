import template from "./add-chat-user-modal.hbs?raw";
import "@/shared/components/button/button";
import { type ToggleChatUserModalProps } from "./types";
import "@/styles/modal.scss";
import "../toggle-chat-user-form/add-chat-user-form";
import { Block } from "@/shared/components/block";
import { registerComponent } from "@/shared/utils/templates";

export class AddChatUserModal extends Block<ToggleChatUserModalProps> {
    static componentName = "AddChatUserModal";

    protected override template = template;
}

registerComponent(AddChatUserModal);
