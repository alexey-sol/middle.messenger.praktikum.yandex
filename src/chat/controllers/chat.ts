import { type ActiveChat, type ChatItem } from "../types";
import chatWindow from "../views/components/chat-window/chat-window.hbs?raw";
import sidebar from "../views/components/sidebar/sidebar.hbs?raw";
import chatTemplate from "../views/layouts/chat.hbs?raw";
import "../views/components/chat-item/chat-item";
import "../views/components/message-item/message-item";
import "../views/components/send-message-form/send-message-form";
import "../views/layouts/chat.scss";
import { ATTACH_DROPDOWN_ITEMS, SETTINGS_DROPDOWN_ITEMS } from "@/chat/constants";
import { ACTIVE_CHAT_MOCK, CHAT_ITEMS_MOCK } from "@/chat/models/mocks";
import { formatChatMessageDate, isFirstDateOccurrence } from "@/chat/utils";
import { View } from "@/shared/components/view";
import { type DropdownItem } from "@/shared/types";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { insertElement } from "@/shared/utils/helpers";
import Handlebars from "handlebars";

Handlebars.registerPartial("sidebar", sidebar);
Handlebars.registerPartial("chat-window", chatWindow);

Handlebars.registerHelper("formatChatMessageDate", formatChatMessageDate);
Handlebars.registerHelper("isFirstDateOccurrence", isFirstDateOccurrence);

type ChatViewProps = {
    activeChat: ActiveChat;
    attachDropdownItems: DropdownItem[];
    chatItems: ChatItem[];
    settingsDropdownItems: DropdownItem[];
};

// class ChatView extends Block<ChatViewProps> {
class ChatView extends View<ChatViewProps> {
    protected override template = chatTemplate;
}

const chatView = new ChatView({
    activeChat: ACTIVE_CHAT_MOCK,
    attachDropdownItems: ATTACH_DROPDOWN_ITEMS,
    chatItems: CHAT_ITEMS_MOCK,
    settingsDropdownItems: SETTINGS_DROPDOWN_ITEMS,
});

const viewElement = chatView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(ChatView.name);
}

insertElement(viewElement);
