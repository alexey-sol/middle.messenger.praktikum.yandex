import messageItemTemplate from "./message-item.hbs?raw";
import { type ChatMessage as MessageItemProps } from "@/chat/types";
import "./message-item.scss";
import { Block } from "@/shared/components/block";
import { formatTime } from "@/shared/utils/formatters";
import { sanitize } from "@/shared/utils/helpers";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";

Handlebars.registerHelper("safeRender", (dirtyHtml) => {
    const cleanHtml = sanitize(dirtyHtml);
    return new Handlebars.SafeString(cleanHtml);
});
Handlebars.registerHelper("formatTime", formatTime);

export class MessageItem extends Block<MessageItemProps> {
    protected override template = messageItemTemplate;
}

registerComponent(MessageItem);
