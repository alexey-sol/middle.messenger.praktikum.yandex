import { type MessengerState } from "@/chat/types";

export const getOpenedChatState = (state: MessengerState) => ({
    openedChat: state.messenger?.openedChat,
    openedChatUsers: state.messenger?.openedChatUsers,
});
