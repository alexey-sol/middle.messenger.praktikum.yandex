export type ActiveChat = {
    messages: ChatMessage[];
    title: string;
};

export type ChatItem = {
    avatar?: null | string;
    date: string;
    id: string;
    isActive?: boolean;
    isOutgoing?: boolean;
    lastMessage?: string;
    title: string;
    unreadCount?: number;
};

export type ChatMessage = {
    date: string;
    id: string;
    images?: Array<{
        title?: string;
        url: string;
    }>;
    isChecked?: boolean;
    isOutgoing?: boolean;
    message?: string;
};
