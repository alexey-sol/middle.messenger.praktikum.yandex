import { type InputProps } from "@/shared/components/input/types";

/* eslint-disable perfectionist/sort-objects -- От порядка полей в объекте зависит порядок отображения */
export const SIGN_UP_FIELDS: Record<string, InputProps> = {
    email: {
        label: "Почта",
        name: "email",
        type: "email",
        required: true,
    },
    login: {
        label: "Логин",
        name: "login",
        type: "text",
        required: true,
    },
    first_name: {
        label: "Имя",
        name: "first_name",
        type: "text",
        required: true,
    },
    second_name: {
        label: "Фамилия",
        name: "second_name",
        type: "text",
    },
    phone: {
        label: "Телефон",
        name: "phone",
        type: "tel",
        required: true,
    },
    password: {
        label: "Пароль",
        name: "password",
        type: "password",
        required: true,
    },
    confirm_password: {
        label: "Пароль (ещё раз)",
        name: "confirm_password",
        type: "password",
        required: true,
    },
};

export const SIGN_IN_FIELDS: Record<string, InputProps> = {
    login: {
        label: "Логин",
        name: "login",
        type: "text",
        required: true,
    },
    password: {
        label: "Пароль",
        name: "password",
        type: "password",
        required: true,
    },
};
/* eslint-enable perfectionist/sort-objects */
