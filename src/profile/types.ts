import { type FormState } from "@/app/store/types";

export type SettingsMode = "password-edit" | "settings-edit" | "settings-view";

export type SettingsState = {
    settings?: {
        form?: {
            updatePassword?: FormState;
            updateUser?: FormState;
            updateUserAvatar?: FormState;
        };
    };
};
