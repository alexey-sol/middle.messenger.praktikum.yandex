import { HttpTransport } from "@/app/http-transport";
import { store } from "@/app/store/store";
import { API_BASE_URL } from "@/shared/constants";
import { type HasId } from "@/shared/types";

export type SignInRequest = {
    login: string;
    password: string;
};

export type SignUpRequest = {
    email: string;
    first_name: string;
    login: string;
    password: string;
    phone: string;
    second_name: string;
};

export type User = HasId & {
    avatar: string;
    display_name: string;
    email: string;
    first_name: string;
    login: string;
    phone: string;
    second_name: string;
};

const AuthApi = {
    getUser() {
        return HttpTransport.get<User>(`${API_BASE_URL}/auth/user`);
    },
    logout() {
        return HttpTransport.post(`${API_BASE_URL}/auth/logout`);
    },
    signIn(request: SignInRequest) {
        return HttpTransport.post(`${API_BASE_URL}/auth/signin`, { data: request });
    },
    signUp(request: SignUpRequest) {
        return HttpTransport.post<HasId>(`${API_BASE_URL}/auth/signup`, { data: request });
    },
};

export const AuthController = {
    async getUser() {
        let user: null | User = null;

        store.setState("auth.user.isLoading", true);

        try {
            user = await AuthApi.getUser();
        } catch {
            user = null;
        }

        store.setState("auth.user.data", user);
        store.setState("auth.user.isLoading", false);

        return user;
    },
    logout() {
        store.setState("auth.user.isLoading", true);

        return AuthApi.logout()
            .then(() => {
                store.setState("auth.user.data", null);
            })
            .finally(() => {
                store.setState("auth.user.isLoading", false);
            });
    },
    signIn(request: SignInRequest) {
        store.setState("auth.user.isLoading", true);

        return AuthApi.signIn(request)
            .then(() => {
                return AuthApi.getUser();
            })
            .then((response) => {
                store.setState("auth.user.data", response);
            })
            .finally(() => {
                store.setState("auth.user.isLoading", false);
            });
    },
    signUp(request: SignUpRequest) {
        store.setState("auth.user.isLoading", true);

        return AuthApi.signUp(request)
            .then(() => {
                return AuthApi.getUser();
            })
            .then((response) => {
                store.setState("auth.user.data", response);
            })
            .finally(() => {
                store.setState("auth.user.isLoading", false);
            });
    },
};
