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
    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);

    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
        day: "numeric",
        month: "long",
    }).format(date);
};

type EntityWithTime = {
    id: string;
    time: string;
};

// TODO наверняка можно придумать более эффективный алгоритм, чем n^2
export const isLastTimeOccurrence = (item: EntityWithTime, items: EntityWithTime[]) => {
    const dateString = new Date(item.time).toDateString();

    const datesGroupedByDay =
        items?.toReversed().filter(({ time }) => new Date(time).toDateString() === dateString) ??
        [];

    return datesGroupedByDay[0]?.id === item.id;
};
