import { type ChatItem as ChatItemProps } from "@/chat/types";
import { formatChatItemDate } from "@/chat/utils";
import "@/chat/views/components/chat-item/chat-item.scss";
import chatItemTemplate from "@/chat/views/components/chat-item/chat-item.hbs?raw";
import { Block } from "@/shared/components/block";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";

Handlebars.registerHelper("formatChatItemDate", formatChatItemDate);

export class ChatItem extends Block<ChatItemProps> {
    static componentName = "ChatItem";

    protected override template = chatItemTemplate;
}

registerComponent(ChatItem);
