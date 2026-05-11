import { type InputProps } from "@/shared/components/input/types";

/* eslint-disable perfectionist/sort-objects -- От порядка полей в объекте зависит порядок отображения */
export const PROFILE_FIELDS: Record<string, InputProps> = {
    display_name: {
        label: "Имя в чате",
        name: "display_name",
        type: "text",
    },
    email: {
        label: "Почта",
        name: "email",
        type: "email",
    },
    first_name: {
        label: "Имя",
        name: "first_name",
        type: "text",
    },
    login: {
        label: "Логин",
        name: "login",
        type: "text",
    },
    phone: {
        label: "Телефон",
        name: "phone",
        type: "tel",
    },
    second_name: {
        label: "Фамилия",
        name: "second_name",
        type: "text",
    },
};

export const PASSWORD_FIELDS: Record<string, InputProps> = {
    old_password: {
        label: "Старый пароль",
        name: "old_password",
        type: "password",
    },
    new_password: {
        label: "Новый пароль",
        name: "new_password",
        type: "password",
    },
    confirm_password: {
        label: "Повторите новый пароль",
        name: "confirm_password",
        type: "password",
    },
} as const;
/* eslint-enable perfectionist/sort-objects */
