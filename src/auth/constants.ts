/* eslint-disable perfectionist/sort-objects -- От порядка полей в объекте зависит порядок отображения */
export const SIGN_UP_FIELDS = {
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
} as const;

export const SIGN_IN_FIELDS = {
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
} as const;
