import { type ActiveChat, type ChatItem } from "./types";

export const CHAT_ITEMS_MOCK: ChatItem[] = [
    {
        avatar: null,
        date: new Date().toISOString(),
        id: "1",
        lastMessage: "Hey sexy mama. Wanna kill all humans?",
        title: "Horrible Gelatinous Blob",
        unreadCount: 1,
    },
    {
        avatar: null,
        date: "2026-04-28T13:40:00.000Z",
        id: "2",
        isActive: true,
        isOutgoing: true,
        lastMessage: "Shut up and take my money!",
        title: "Hermes Conrad",
    },
    {
        avatar: null,
        date: "2026-04-26T10:52:21.000Z",
        id: "3",
        lastMessage: "Dammit Kif, where's the little umbrella?",
        title: "Morbo the Annihilator",
        unreadCount: 10,
    },
    {
        avatar: null,
        date: "2026-02-01T10:00:00.000Z",
        id: "4",
        lastMessage: "Hey! I got a busted ass here and I don't see anyone kissing it!",
        title: "Kif Kroker",
        unreadCount: 3,
    },
    {
        avatar: null,
        date: "2026-02-01T10:00:00.000Z",
        id: "5",
        lastMessage:
            "Well, if jacking on will make strangers think I'm cool, I'll do it. You know what cheers me up? Other people's misfortune.",
        title: "Lord Nibbler",
    },
    {
        avatar: null,
        date: "2026-02-01T10:00:00.000Z",
        id: "6",
        lastMessage:
            "Fry, it's been years since medical school, so remind me. Disemboweling in your species, fatal or non-fatal?",
        title: "Chanukah Zombie",
    },
    {
        avatar: null,
        date: "2026-02-01T10:00:00.000Z",
        id: "7",
        lastMessage: "I'm so embarrassed. I wish everybody else was dead.",
        title: "Doctor John Zoidberg",
    },
    {
        avatar: null,
        date: "2026-02-01T10:00:00.000Z",
        id: "8",
        lastMessage: "It's when women are polite to each other you know there's a problem.",
        title: "Leo Wong",
    },
    {
        avatar: null,
        date: "2026-02-01T10:00:00.000Z",
        id: "9",
        lastMessage: "I don't want to live on this planet anymore.",
        title: "Turanga Leela",
    },
    {
        avatar: null,
        date: "2026-02-01T10:00:00.000Z",
        id: "10",
        lastMessage: "I really ought to do something but I am already in my pyjamas.",
        title: "Smitty",
    },
    {
        avatar: null,
        date: "1999-01-01T00:00:00.000Z",
        id: "11",
        lastMessage: "Did everything just taste purple for a second?",
        title: "Gypsy-bot",
    },
];

export const ACTIVE_CHAT_MOCK: ActiveChat = {
    messages: [
        {
            date: "2026-04-20T11:25:10.000Z",
            id: "1",
            message:
                "<p>I don't want to live on this planet anymore. I got ants in my butt, and I needs to strut. I don't have emotions & sometimes that makes me very sad. Excuse my language but I have had it with you ruffling my petticoats! I'm so embarrassed. I wish everybody else was dead. Shut up and take my money!</p><p>Dammit Kif, where's the little umbrella? That's what makes it a scotch on the rocks! Ugh, it's like a party in my mouth & everyone's throwing up. Well, if jacking on will make strangers think I'm cool, I'll do it Ugh, it's like a party in my mouth & everyone's throwing up.</p>",
        },
        {
            date: "2026-04-21T11:25:10.000Z",
            id: "2",
            message: "<p>Ah, Xmas Eve. Another pointless day where I accomplish nothing.</p>",
        },
        {
            date: "2026-04-21T11:25:10.000Z",
            id: "3",
            images: [
                {
                    title: "title",
                    url: "https://avatars.mds.yandex.net/get-lpc/12602567/3f17b020-e31c-4d5b-9a3a-2214f5d81e48/width_768x2_q80",
                },
            ],
            message: "<p>I'm so embarrassed. I wish everybody else was dead.</p>",
        },
        {
            date: new Date().toISOString(),
            id: "4",
            isChecked: true,
            isOutgoing: true,
            message: "<p>Hey sexy mama. Wanna kill all humans?</p>",
        },
    ],
    title: "Doctor John Zoidberg",
};
