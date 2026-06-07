import { ChatsController, type ToggleChatUserRequest } from "../api";
import { type MessengerState } from "../types";
import "@/chat/components/send-message-form/send-message-form";
import "@/chat/components/toggle-chat-user-modal/add-chat-user-modal";
import "@/chat/components/toggle-chat-user-modal/delete-chat-user-modal";
import chatWindow from "../views/components/chat-window/chat-window.hbs?raw";
import sidebar from "../views/components/sidebar/sidebar.hbs?raw";
import chatTemplate from "../views/layouts/chat.hbs?raw";
import { connect, store } from "@/app/store/store";
import { type User } from "@/auth/api";
import { formatChatMessageDate, isFirstDateOccurrence } from "@/chat/utils";
import { type SearchUserRequest, UsersController } from "@/profile/api";
import "../components/create-chat-modal/create-chat-modal";
import { type MapEventNameToListenerArgs } from "@/shared/components/block";
import "../views/components/chat-item/chat-item";
import { type FormProps } from "@/shared/components/form";
import "../views/components/message-item/message-item";
import loader from "@/shared/components/loader/loader.hbs?raw";
import { View } from "@/shared/components/view";
import "../views/layouts/chat.scss";
import { type DropdownItem } from "@/shared/types";
import { getFormValues } from "@/shared/utils/helpers";
import Handlebars from "handlebars";

Handlebars.registerPartial("sidebar", sidebar);
Handlebars.registerPartial("chat-window", chatWindow);
Handlebars.registerPartial("loader", loader);

Handlebars.registerHelper("formatChatMessageDate", formatChatMessageDate);
Handlebars.registerHelper("isFirstDateOccurrence", isFirstDateOccurrence);

type ChatViewProps = Pick<FormProps, "fields" | "onSubmit" | "validators"> & {
    attachDropdownItems: DropdownItem[];
    chats?: Required<MessengerState>["messenger"]["chats"];
    modal?: null | {
        addChatUser?: boolean;
        createChat?: boolean;
        deleteChatUser?: boolean;
    };
    openedChat?: Required<MessengerState>["messenger"]["openedChat"];
    settingsDropdownItems: DropdownItem[];
};

class ChatView extends View<ChatViewProps> {
    private handleCloseModal = (event: Event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        if ("modalOverlay" in target.dataset) {
            this.setProps({
                modal: null,
            });
        }
    };

    private handleOpenModal = (event: Event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        switch (target.dataset.case) {
            case "add-chat-user":
                event.preventDefault();
                this.setProps({
                    modal: { ...this.props.modal, addChatUser: true },
                });
                break;
            case "create-chat":
                event.preventDefault();
                this.setProps({
                    modal: { ...this.props.modal, createChat: true },
                });
                break;
            case "delete-chat-user":
                event.preventDefault();
                this.setProps({
                    modal: { ...this.props.modal, deleteChatUser: true },
                });
                break;
            case "open-chat": {
                event.preventDefault();

                if (target.dataset.chatId) {
                    this.openChat(Number(target.dataset.chatId));
                }

                break;
            }
        }
    };

    protected override events: MapEventNameToListenerArgs = {
        click: {
            listener: (event) => {
                this.handleOpenModal(event);
                this.handleCloseModal(event);
            },
        },
    };

    protected override template = chatTemplate;

    constructor(props: ChatViewProps) {
        super(props);

        store.setState("messenger.form.addChatUser.onSubmit", this.handleAddChatUser);
        store.setState("messenger.form.deleteChatUser.onSubmit", this.handleDeleteChatUser);
        store.setState("messenger.form.createChat.onSubmit", this.handleCreateChat);
    }

    componentDidMount() {
        ChatsController.getChats().catch((error) => {
            console.error("Ошибка при загрузке чатов", error);
        });
    }

    private handleAddChatUser = async (event: SubmitEvent) => {
        return this.handleToggleChatUser(event, ChatsController.addUser, "добавление");
    };

    private handleCreateChat = async (event: SubmitEvent) => {
        event.preventDefault();

        const target = event.target;

        if (!(target instanceof HTMLFormElement)) {
            return;
        }

        try {
            await ChatsController.createChat(getFormValues(target, ["title"]));
            await ChatsController.getChats();
            this.setProps({ modal: null });
        } catch (error) {
            console.error("Ошибка при создании чата", error);
        }
    };

    private handleDeleteChatUser = async (event: SubmitEvent) => {
        return this.handleToggleChatUser(event, ChatsController.deleteUser, "удаление");
    };

    private handleToggleChatUser = async (
        event: SubmitEvent,
        onToggle: (request: ToggleChatUserRequest) => Promise<unknown>,
        actionTitle: string,
    ) => {
        event.preventDefault();

        const target = event.target;

        if (!(target instanceof HTMLFormElement)) {
            return;
        }

        const actionText = `Операция: ${actionTitle}`;

        const searchUserRequest: SearchUserRequest = getFormValues(target, ["login"]);
        const user = await UsersController.findUserByLogin(searchUserRequest);

        if (!user) {
            console.error(`Не удалось найти пользователя ${searchUserRequest.login}`);
            return;
        }

        const toggleUserRequest = await this.mapToogleChatUserRequest(user);

        if (!toggleUserRequest) {
            console.error(
                `${actionText}. Не удалось сформировать запрос для операции над пользователем`,
            );
            return;
        }

        try {
            await onToggle(toggleUserRequest);
            console.log(`Успех. ${actionText}. Пользователь: ${searchUserRequest.login}`);
            this.setProps({ modal: null });
        } catch (error) {
            console.error(`Ошибка. ${actionText}. Пользователь: ${searchUserRequest.login}`, error);
        }
    };

    private mapToogleChatUserRequest = async (
        user: User,
    ): Promise<null | ToggleChatUserRequest> => {
        if (typeof this.props.openedChat?.data?.id !== "number") {
            return null;
        }

        return {
            chatId: this.props.openedChat?.data?.id,
            users: [user.id],
        };
    };

    private openChat = (chatId: number) => {
        const openedChat = this.props.chats?.data?.find((chat) => chat.id === chatId);
        store.setState("messenger.openedChat.data", openedChat);
    };
}

const mapStateToProps = (state: MessengerState) => {
    return {
        chats: state.messenger?.chats,
        openedChat: state.messenger?.openedChat,
    };
};

export default connect(mapStateToProps)(ChatView);
