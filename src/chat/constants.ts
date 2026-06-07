import { type InputProps } from "@/shared/components/input/types";
import { type DropdownItem } from "@/shared/types";

export const SETTINGS_DROPDOWN_ITEMS: DropdownItem[] = [
    {
        dataCase: "add-chat-user",
        iconUrl: "/assets/icons/add.svg",
        title: "Добавить пользователя",
    },
    {
        dataCase: "delete-chat-user",
        iconUrl: "/assets/icons/delete.svg",
        title: "Удалить пользователя",
    },
];

export const ATTACH_DROPDOWN_ITEMS: DropdownItem[] = [
    {
        dataCase: "media",
        iconUrl: "/assets/icons/media.svg",
        title: "Фото или видео",
    },
    {
        dataCase: "file",
        iconUrl: "/assets/icons/file.svg",
        title: "Файл",
    },
    {
        dataCase: "location",
        iconUrl: "/assets/icons/location.svg",
        title: "Локация",
    },
];

export const SEND_MESSAGE_FORM_FIELDS: InputProps[] = [
    {
        name: "message",
        placeholder: "Сообщение",
        type: "text",
    },
];
