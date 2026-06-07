import { type FormState, type RequestState } from "@/app/store/types";

export type ActiveChat = {
    messages: ChatMessage[];
    title: string;
};

export type ChatItem = {
    avatar: null | string;
    createdBy: number;
    id: number;
    lastMessage: null | string;
    title: string;
    unreadCount: number;
};

export type ChatMessage = {
    date: string;
    id: string;
    images?: Array<{
        title?: string;
        url: string;
    }>;
    isChecked?: boolean;
    isOutgoing?: boolean;
    message?: string;
};

export type MessengerState = {
    messenger?: {
        chats?: RequestState<ChatItem[]>;
        form?: {
            addChatUser?: FormState;
            createChat?: FormState;
            deleteChatUser?: FormState;
        };
        openedChat?: RequestState<ChatItem>;
    };
};
