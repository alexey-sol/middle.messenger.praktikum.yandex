import template from "./chat-item.hbs?raw";
import { connect } from "@/app/store/store";
import { type ChatItem as ChatItemProps, type MessengerState } from "@/chat/types";
import { formatChatItemDate } from "@/chat/utils/utils";
import "./chat-item.scss";
import { Block } from "@/shared/components/block";
import { equals } from "@/shared/utils/helpers";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";

Handlebars.registerHelper("formatChatItemDate", formatChatItemDate);

Handlebars.registerHelper("eq", equals);

export class ChatItem extends Block<ChatItemProps> {
    static componentName = "ChatItem";

    protected override template = template;
}

const mapStateToProps = (state: MessengerState) => {
    return {
        openedChat: state?.messenger?.openedChat?.data,
    };
};

registerComponent(connect(mapStateToProps)(ChatItem));
