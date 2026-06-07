import { type User } from "./api";
import { type RequestState } from "@/app/store/types";

export type AuthState = {
    auth?: {
        user?: RequestState<User>;
    };
};
