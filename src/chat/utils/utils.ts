import { DEFAULT_LOCALE } from "@/shared/constants";
import { formatTime } from "@/shared/utils/formatters";

export const formatChatItemDate = (dateString: string) => {
    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);
    const isToday = new Date().toDateString() === date.toDateString();

    if (isToday) {
        return formatTime(dateString);
    }

    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};

export const formatChatMessageDate = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
        day: "numeric",
        month: "long",
    }).format(date);
};

type EntityWithDate = {
    date: string;
    id: string;
};

// TODO наверняка можно придумать более эффективный алгоритм, чем n^2
export const isFirstDateOccurrence = (item: EntityWithDate, items: EntityWithDate[]) => {
    const dateString = new Date(item.date).toDateString();

    const datesGroupedByDay =
        items?.filter(({ date }) => new Date(date).toDateString() === dateString) ?? [];

    return datesGroupedByDay[0]?.id === item.id;
};
