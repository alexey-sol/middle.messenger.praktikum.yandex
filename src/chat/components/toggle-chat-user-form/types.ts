import { type MessengerState } from "@/chat/types";
import { type FormProps } from "@/shared/components/form";

export type ToggleChatUserFormProps = Pick<FormProps, "onSubmit" | "validators"> & {
    buttonTitle: string;
    openedChat?: Required<MessengerState>["messenger"]["openedChat"];
    openedChatUsers?: Required<MessengerState>["messenger"]["openedChatUsers"];
};
