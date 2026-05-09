import { PASSWORD_FIELDS, PROFILE_FIELDS } from "./constants";

export const PROFILE_FIELDS_MOCK = [
    {
        ...PROFILE_FIELDS.email,
        value: "pochta@yandex.ru",
    },
    {
        ...PROFILE_FIELDS.login,
        value: "alexius",
    },
    {
        ...PROFILE_FIELDS.first_name,
        value: "Алексей",
    },
    {
        ...PROFILE_FIELDS.second_name,
        value: "Забыл",
    },
    {
        ...PROFILE_FIELDS.display_name,
        value: "Алексей",
    },
    {
        ...PROFILE_FIELDS.phone,
        value: "+7 (123) 456 78 90",
    },
] as const;

export const DISABLED_PROFILE_FIELDS_MOCK = PROFILE_FIELDS_MOCK.map((field) => ({
    ...field,
    disabled: true,
}));

export const PASSWORD_FIELDS_MOCK = Object.values(PASSWORD_FIELDS).map((field) => ({
    ...field,
    value: "***",
}));
