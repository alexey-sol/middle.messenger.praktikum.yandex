import { type InputProps } from "@/shared/components/input/types";

export const SIGN_UP_FIELDS: InputProps[] = [
    {
        label: "Почта",
        name: "email",
        type: "email",
    },
    {
        label: "Логин",
        name: "login",
        type: "text",
    },
    {
        label: "Имя",
        name: "first_name",
        type: "text",
    },
    {
        label: "Фамилия",
        name: "second_name",
        type: "text",
    },
    {
        label: "Телефон",
        name: "phone",
        type: "tel",
    },
    {
        label: "Пароль",
        name: "password",
        type: "password",
    },
    {
        label: "Пароль (ещё раз)",
        name: "confirm_password",
        type: "password",
    },
] as const;

export const SIGN_IN_FIELDS: InputProps[] = [
    {
        label: "Логин",
        name: "login",
        type: "text",
    },
    {
        label: "Пароль",
        name: "password",
        type: "password",
    },
] as const;
