import { HttpTransport } from "@/app/http-transport";
import { store } from "@/app/store/store";
import { API_BASE_URL } from "@/shared/constants";
import { type HasId } from "@/shared/types";

export type CreateChatRequest = {
    title: string;
};

export type ToggleChatUserRequest = {
    chatId: number;
    users: number[];
};

const ChatsApi = {
    addChatUser(request: ToggleChatUserRequest) {
        return HttpTransport.put(`${API_BASE_URL}/chats/users`, { data: request });
    },
    createChat(request: CreateChatRequest) {
        return HttpTransport.post<HasId>(`${API_BASE_URL}/chats`, { data: request });
    },
    deleteChatUser(request: ToggleChatUserRequest) {
        return HttpTransport.delete(`${API_BASE_URL}/chats/users`, { data: request });
    },
    getChats() {
        return HttpTransport.get<GetChatsResponse>(`${API_BASE_URL}/chats`);
    },
};

type GetChatsResponse = Array<
    HasId & {
        avatar: null | string;
        created_by: number;
        last_message: null | string;
        title: string;
        unread_count: number;
    }
>;

export const ChatsController = {
    addUser(request: ToggleChatUserRequest) {
        return ChatsApi.addChatUser(request);
    },
    createChat(request: CreateChatRequest) {
        return ChatsApi.createChat(request);
    },
    deleteUser(request: ToggleChatUserRequest) {
        return ChatsApi.deleteChatUser(request);
    },
    getChats() {
        store.setState("messenger.chats.isLoading", true);

        return ChatsApi.getChats()
            .then((data) => {
                const normalizedData =
                    data?.map((item) => ({
                        avatar: item.avatar,
                        createdBy: item.created_by,
                        id: item.id,
                        lastMessage: item.last_message,
                        title: item.title,
                        unreadCount: item.unread_count ?? 0,
                    })) ?? [];

                store.setState("messenger.chats.data", normalizedData);
            })
            .finally(() => {
                store.setState("messenger.chats.isLoading", false);
            });
    },
};
