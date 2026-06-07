import createChatModalTemplate from "./create-chat-modal.hbs?raw";
import "@/shared/components/button/button";
import { Block } from "@/shared/components/block";
import "../create-chat-form/create-chat-form";
import { registerComponent } from "@/shared/utils/templates";
import "@/styles/modal.scss";

export type CreateChatModalProps = {
    isOpen?: boolean;
};

export class CreateChatModal extends Block<CreateChatModalProps> {
    static componentName = "CreateChatModal";

    protected override template = createChatModalTemplate;
}

registerComponent(CreateChatModal);
