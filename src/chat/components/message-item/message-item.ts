import messageItemTemplate from "./message-item.hbs?raw";
import { Block } from "@/shared/components/block";
import { formatTime } from "@/shared/utils/formatters";
import { sanitize } from "@/shared/utils/helpers";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";
import "./message-item.scss";

Handlebars.registerHelper("safeRender", (dirtyHtml) => {
    const cleanHtml = sanitize(dirtyHtml);
    return new Handlebars.SafeString(cleanHtml);
});
Handlebars.registerHelper("formatTime", formatTime);

type MessageItemProps = {
    content: string;
    images?: unknown[];
    isOutgoing?: boolean;
    isRead: boolean;
    isSystem?: boolean;
    time: string;
    userId: string;
};

export class MessageItem extends Block<MessageItemProps> {
    static componentName = "MessageItem";

    protected override template = messageItemTemplate;
}

registerComponent(MessageItem);
