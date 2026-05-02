import chatWindow from "../components/chat-window/chat-window.hbs?raw";
import sidebar from "../components/sidebar/sidebar.hbs?raw";
import rawTemplate from "../layouts/chat/chat.hbs?raw";
import { ATTACH_DROPDOWN_ITEMS, SETTINGS_DROPDOWN_ITEMS } from "@/chat/constants";
import { ACTIVE_CHAT_MOCK, CHAT_ITEMS_MOCK } from "@/chat/mocks";
import { formatChatItemDate, formatChatMessageDate, isFirstDateOccurrence } from "@/chat/utils";
import dropdown from "@/shared/components/dropdown/dropdown.hbs?raw";
import { formatTime } from "@/shared/utils/formatters";
import { insertHtml, sanitize } from "@/shared/utils/helpers";
import "../layouts/chat/chat.scss";
import Handlebars from "handlebars";

Handlebars.registerPartial("sidebar", sidebar);
Handlebars.registerPartial("chat-window", chatWindow);
Handlebars.registerPartial("dropdown", dropdown);

Handlebars.registerHelper("sanitize", sanitize);
Handlebars.registerHelper("formatTime", formatTime);
Handlebars.registerHelper("formatChatItemDate", formatChatItemDate);
Handlebars.registerHelper("formatChatMessageDate", formatChatMessageDate);
Handlebars.registerHelper("isFirstDateOccurrence", isFirstDateOccurrence);

const template = Handlebars.compile(rawTemplate);

export const renderChat = () => {
    return template({
        activeChat: ACTIVE_CHAT_MOCK,
        attachDropdownItems: ATTACH_DROPDOWN_ITEMS,
        chatItems: CHAT_ITEMS_MOCK,
        settingsDropdownItems: SETTINGS_DROPDOWN_ITEMS,
    });
};

insertHtml(renderChat());
