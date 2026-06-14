import template from "./delete-chat-modal.hbs?raw";
import "@/shared/components/button/button";
import { Block } from "@/shared/components/block";
import "../delete-chat-form/delete-chat-form";
import { registerComponent } from "@/shared/utils/templates";
import "@/styles/modal.scss";

export type DeleteChatModalProps = {
    isOpen?: boolean;
};

export class DeleteChatModal extends Block<DeleteChatModalProps> {
    static componentName = "DeleteChatModal";

    protected override template = template;
}

registerComponent(DeleteChatModal);
