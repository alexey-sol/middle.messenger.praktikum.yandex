import { connect } from "@/app/store/store";
import { type ChatItem as ChatItemProps, type MessengerState } from "@/chat/types";
import { formatChatItemDate } from "@/chat/utils/utils";
import chatItemTemplate from "@/chat/views/components/chat-item/chat-item.hbs?raw";
import "@/chat/views/components/chat-item/chat-item.scss";
import { Block } from "@/shared/components/block";
import { equals } from "@/shared/utils/helpers";
import { registerComponent } from "@/shared/utils/templates";
import Handlebars from "handlebars";

Handlebars.registerHelper("formatChatItemDate", formatChatItemDate);

Handlebars.registerHelper("eq", equals);

export class ChatItem extends Block<ChatItemProps> {
    static componentName = "ChatItem";

    protected override template = chatItemTemplate;
}

const mapStateToProps = (state: MessengerState) => {
    return {
        openedChat: state?.messenger?.openedChat?.data,
    };
};

registerComponent(connect(mapStateToProps)(ChatItem));
