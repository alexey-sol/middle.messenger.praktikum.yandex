import { DEFAULT_LOCALE } from "../constants";

export const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};
