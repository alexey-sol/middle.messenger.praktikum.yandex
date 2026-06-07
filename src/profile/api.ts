import { HttpTransport } from "@/app/http-transport";
import { store } from "@/app/store/store";
import { type User } from "@/auth/api";
import { API_BASE_URL } from "@/shared/constants";

export type SearchUserRequest = Pick<User, "login">;

export type UpdatePasswordRequest = {
    newPassword: string;
    oldPassword: string;
};

export type UpdateUserRequest = Omit<User, "avatar" | "id">;

const UsersApi = {
    searchUsers(request: SearchUserRequest) {
        return HttpTransport.post<User[]>(`${API_BASE_URL}/user/search`, { data: request });
    },
    updateAvatar(request: FormData) {
        return HttpTransport.put<User>(`${API_BASE_URL}/user/profile/avatar`, { data: request });
    },
    updatePassword(request: UpdatePasswordRequest) {
        return HttpTransport.put(`${API_BASE_URL}/user/password`, { data: request });
    },
    updateUser(request: UpdateUserRequest) {
        return HttpTransport.put<User>(`${API_BASE_URL}/user/profile`, { data: request });
    },
};

export const UsersController = {
    async findUserByLogin(request: SearchUserRequest) {
        let users: User[] = [];

        try {
            users = await UsersApi.searchUsers(request);
        } catch (error) {
            console.error("Ошибка при поиске пользователя", error);
        }

        return users.find((user) => user.login === request.login) ?? null;
    },
    updateAvatar(request: FormData) {
        return UsersApi.updateAvatar(request).then((response) => {
            store.setState("auth.user.data", response);
        });
    },
    updatePassword(request: UpdatePasswordRequest) {
        return UsersApi.updatePassword(request);
    },
    updateUser(request: UpdateUserRequest) {
        return UsersApi.updateUser(request).then(() => {
            store.setState("auth.user.data", request);
        });
    },
};
