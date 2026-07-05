import { type FormState, type RequestState } from "@/app/store/types";
import { type User } from "@/auth/api";
import { type HasId } from "@/shared/types";

export type ChatItem = {
    avatar: null | string;
    createdBy: number;
    id: number;
    lastMessage: null | string;
    title: string;
    unreadCount: number;
};

export type ChatMessage = HasId & {
    chat_id: number;
    content: string;
    is_read: boolean;
    time: string;
    type: "message";
    user_id: number;
};

export type MessengerState = {
    messenger?: {
        chats?: RequestState<ChatItem[]>;
        form?: {
            addChatUser?: FormState;
            createChat?: FormState;
            deleteChat?: FormState;
            deleteChatUser?: FormState;
            updateChatAvatar?: FormState;
        };
        openedChat?: RequestState<ChatItem>;
        openedChatUsers?: RequestState<User[]>;
    };
};
