import { type ChatItem, type MessengerState } from "./types";
import { HttpTransport } from "@/app/http-transport";
import { store } from "@/app/store/store";
import { type User } from "@/auth/api";
import { API_BASE_URL } from "@/shared/constants";
import { type HasId } from "@/shared/types";

export type CreateChatRequest = {
    title: string;
};

export type ToggleChatUserRequest = HasChatId & {
    users: number[];
};

type GetChatsResponse = Array<
    HasId & {
        avatar: null | string;
        created_by: number;
        last_message: null | {
            content: null | string;
        };
        title: string;
        unread_count: number;
    }
>;

type GetChatTokenResponse = {
    token: string;
};

type GetMessageCountResponse = {
    unread_count: number;
};

type HasChatId = {
    chatId: number;
};

const ChatsApi = {
    addChatUser(request: ToggleChatUserRequest) {
        return HttpTransport.put(`${API_BASE_URL}/chats/users`, { data: request });
    },
    createChat(request: CreateChatRequest) {
        return HttpTransport.post<HasId>(`${API_BASE_URL}/chats`, { data: request });
    },
    deleteChat(request: HasChatId) {
        return HttpTransport.delete(`${API_BASE_URL}/chats`, { data: request });
    },
    deleteChatUser(request: ToggleChatUserRequest) {
        return HttpTransport.delete(`${API_BASE_URL}/chats/users`, { data: request });
    },
    getChats() {
        return HttpTransport.get<GetChatsResponse>(`${API_BASE_URL}/chats`);
    },
    getChatToken({ chatId }: HasChatId) {
        return HttpTransport.post<GetChatTokenResponse>(`${API_BASE_URL}/chats/token/${chatId}`);
    },
    getChatUsers({ chatId }: HasChatId) {
        return HttpTransport.get<User[]>(`${API_BASE_URL}/chats/${chatId}/users`);
    },
    getMessageCount({ chatId }: HasChatId) {
        return HttpTransport.get<GetMessageCountResponse>(`${API_BASE_URL}/chats/new/${chatId}`);
    },
    updateAvatar(request: FormData) {
        return HttpTransport.put<ChatItem>(`${API_BASE_URL}/chats/avatar`, { data: request });
    },
};

export const ChatsController = {
    addUser(request: ToggleChatUserRequest) {
        return ChatsApi.addChatUser(request);
    },
    createChat(request: CreateChatRequest) {
        return ChatsApi.createChat(request);
    },
    deleteChat(request: HasChatId) {
        return ChatsApi.deleteChat(request);
    },
    deleteUser(request: ToggleChatUserRequest) {
        return ChatsApi.deleteChatUser(request);
    },
    getChats(onSuccess?: () => void) {
        const messenger = store.getState().messenger as MessengerState["messenger"];
        const isUninitialized = !messenger?.chats?.data;

        if (isUninitialized) {
            store.setState("messenger.chats.isLoading", true);
        }

        return ChatsApi.getChats()
            .then((data) => {
                onSuccess?.();

                const normalizedData =
                    data?.map((item) => ({
                        avatar: item.avatar,
                        createdBy: item.created_by,
                        id: item.id,
                        lastMessage: item.last_message?.content,
                        title: item.title,
                        unreadCount: item.unread_count ?? 0,
                    })) ?? [];

                store.setState("messenger.chats.data", normalizedData);
            })
            .finally(() => {
                store.setState("messenger.chats.isLoading", false);
            });
    },
    getChatToken(request: HasChatId) {
        return ChatsApi.getChatToken(request).then((response) => {
            store.setState("messenger.openedChatToken.data", response);
            return response;
        });
    },
    getChatUsers(request: HasChatId) {
        return ChatsApi.getChatUsers(request).then((response) => {
            store.setState("messenger.openedChatUsers.data", response);
        });
    },
    getMessageCount(request: HasChatId) {
        return ChatsApi.getMessageCount(request);
    },
    updateAvatar(request: FormData) {
        return ChatsApi.updateAvatar(request).then((response) => {
            store.setState("messenger.openedChat.data", response);
            return ChatsController.getChats();
        });
    },
};
