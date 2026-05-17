import { PASSWORD_FIELDS, PROFILE_FIELDS } from "./constants";
import { type InputProps } from "@/shared/components/input/types";

export const PROFILE_FIELDS_MOCK: InputProps[] = [
    {
        ...PROFILE_FIELDS[0],
        value: "pochta@yandex.ru",
    },
    {
        ...PROFILE_FIELDS[1],
        value: "alexius",
    },
    {
        ...PROFILE_FIELDS[2],
        value: "Алексей",
    },
    {
        ...PROFILE_FIELDS[3],
        value: "Забыл",
    },
    {
        ...PROFILE_FIELDS[4],
        value: "Алексей",
    },
    {
        ...PROFILE_FIELDS[5],
        value: "+71234567890",
    },
] as const;

export const DISABLED_PROFILE_FIELDS_MOCK: InputProps[] = PROFILE_FIELDS_MOCK.map((field) => ({
    ...field,
    disabled: true,
}));

export const PASSWORD_FIELDS_MOCK: InputProps[] = Object.values(PASSWORD_FIELDS).map((field) => ({
    ...field,
    value: "***",
}));
