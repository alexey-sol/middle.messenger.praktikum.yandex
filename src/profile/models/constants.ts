import { type InputProps } from "@/shared/components/input/types";

export const PROFILE_FIELDS: InputProps[] = [
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
        label: "Имя в чате",
        name: "display_name",
        type: "text",
    },
    {
        label: "Телефон",
        name: "phone",
        type: "tel",
    },
] as const;

export const PASSWORD_FIELDS: InputProps[] = [
    {
        label: "Старый пароль",
        name: "old_password",
        type: "password",
    },
    {
        label: "Новый пароль",
        name: "new_password",
        type: "password",
    },
    {
        label: "Повторите новый пароль",
        name: "confirm_password",
        type: "password",
    },
] as const;
