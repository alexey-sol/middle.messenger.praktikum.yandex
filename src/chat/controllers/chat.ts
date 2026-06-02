import "@/chat/components/send-message-form/send-message-form";
import { type ActiveChat, type ChatItem } from "../types";
import chatWindow from "../views/components/chat-window/chat-window.hbs?raw";
import sidebar from "../views/components/sidebar/sidebar.hbs?raw";
import chatTemplate from "../views/layouts/chat.hbs?raw";
import "../views/components/chat-item/chat-item";
import "../views/components/message-item/message-item";
import "../views/layouts/chat.scss";
import {
    ATTACH_DROPDOWN_ITEMS,
    SEND_MESSAGE_FORM_FIELDS,
    SETTINGS_DROPDOWN_ITEMS,
} from "@/chat/constants";
import { ACTIVE_CHAT_MOCK, CHAT_ITEMS_MOCK } from "@/chat/models/mocks";
import { formatChatMessageDate, isFirstDateOccurrence } from "@/chat/utils";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { type DropdownItem } from "@/shared/types";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { insertElement, logFormValues } from "@/shared/utils/helpers";
import { EMPTY_ERROR, setOrResetErrorMessage } from "@/shared/utils/validators";
import Handlebars from "handlebars";

Handlebars.registerPartial("sidebar", sidebar);
Handlebars.registerPartial("chat-window", chatWindow);

Handlebars.registerHelper("formatChatMessageDate", formatChatMessageDate);
Handlebars.registerHelper("isFirstDateOccurrence", isFirstDateOccurrence);

const validateMessage = (input: HTMLInputElement) => {
    const value = input.value.trim();
    const message = value.length ? "" : EMPTY_ERROR;

    setOrResetErrorMessage(input, message);

    return !message;
};

type ChatViewProps = Pick<FormProps, "fields" | "onSubmit" | "validators"> & {
    activeChat: ActiveChat;
    attachDropdownItems: DropdownItem[];
    chatItems: ChatItem[];
    settingsDropdownItems: DropdownItem[];
};

class ChatView extends View<ChatViewProps> {
    protected override template = chatTemplate;
}

const chatView = new ChatView({
    activeChat: ACTIVE_CHAT_MOCK,
    attachDropdownItems: ATTACH_DROPDOWN_ITEMS,
    chatItems: CHAT_ITEMS_MOCK,
    fields: SEND_MESSAGE_FORM_FIELDS,
    onSubmit: (event) => logFormValues(event, SEND_MESSAGE_FORM_FIELDS),
    settingsDropdownItems: SETTINGS_DROPDOWN_ITEMS,
    validators: {
        message: validateMessage,
    },
});

const viewElement = chatView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(ChatView.name);
}

insertElement(viewElement);
