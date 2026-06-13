import { type UpdatePasswordRequest, type UpdateUserRequest, UsersController } from "../api";
import "@/profile/components/profile-form/profile-form";
import { type SettingsMode } from "../types";
import "@/profile/components/update-user-avatar-modal/update-user-avatar-modal";
import { router } from "@/app/router";
import "@/profile/views/layouts/settings.scss";
import "@/profile/views/layouts/styles.scss";
import { store } from "@/app/store/store";
import { AuthController } from "@/auth/api";
import { type AuthState } from "@/auth/types";
import { withUser } from "@/auth/utils";
import profileSidebar from "@/profile/components/profile-sidebar/profile-sidebar.hbs?raw";
import settingsTemplate from "@/profile/views/layouts/settings.hbs?raw";
import { type MapEventNameToListenerArgs } from "@/shared/components/block";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { type HasAvatarFile } from "@/shared/types";
import { equals, getFormValues } from "@/shared/utils/helpers";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);

Handlebars.registerHelper("eq", equals);

export type SettingsViewProps = Partial<HasAvatarFile> &
    Pick<FormProps, "onSubmit" | "validators"> & {
        modal?: null | {
            updateUserAvatar?: boolean;
        };
        mode: SettingsMode;
        user?: Required<AuthState>["auth"]["user"];
    };

export class SettingsView extends View<SettingsViewProps> {
    private handleCloseModal = (event: Event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        if (target.dataset.case === "close-modal") {
            this.setProps({ modal: null });
        }
    };

    private handleNavigationBackClick = (event: Event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        if ("back" in target.dataset) {
            switch (this.props.mode) {
                case "password-edit":
                case "settings-edit":
                    this.setProps({ mode: "settings-view" });
                    break;
                case "settings-view":
                default:
                    router.go("/messenger");
            }
        }
    };

    private handleNavigationForwardClick = (event: Event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        switch (target.dataset.case) {
            case "password-edit":
                event.preventDefault();
                this.setProps({ mode: "password-edit" });
                break;
            case "settings-edit":
                event.preventDefault();
                this.setProps({ mode: "settings-edit" });
                break;
            case "update-avatar":
                event.preventDefault();
                this.setProps({
                    modal: { ...this.props.modal, updateUserAvatar: true },
                });
                break;
            case "logout":
                event.preventDefault();
                AuthController.logout()
                    .then(() => {
                        router.go("/");
                    })
                    .catch((error) => {
                        console.error("Ошибка при выходе", error);
                    });
        }
    };

    protected override events: MapEventNameToListenerArgs = {
        click: {
            listener: (event) => {
                this.handleNavigationForwardClick(event);
                this.handleNavigationBackClick(event);
                this.handleCloseModal(event);
            },
        },
    };

    protected override template = settingsTemplate;

    constructor(props: SettingsViewProps) {
        super(props);

        store.setState("settings.form.updateUser.onSubmit", this.handleUpdateUser);
        store.setState("settings.form.updatePassword.onSubmit", this.handleUpdatePassword);
        store.setState("settings.form.updateUserAvatar.onSubmit", this.handleUpdateUserAvatar);
        store.setState("settings.form.updateUserAvatar.onChange", this.handleUserAvatarChange);
    }

    componentDidMount() {
        AuthController.getUser().catch((error) => {
            console.error("Ошибка при загрузке пользователя", error);
        });
    }

    private handleUpdatePassword = (event: SubmitEvent) => {
        event.preventDefault();

        const target = event.target;

        if (!(target instanceof HTMLFormElement)) {
            return;
        }

        const data = getFormValues<Record<string, string>>(target, [
            "old_password",
            "new_password",
        ]);

        const normData: UpdatePasswordRequest = {
            newPassword: data.new_password,
            oldPassword: data.old_password,
        };

        UsersController.updatePassword(normData)
            .then(() => {
                this.setProps({ mode: "settings-view" });
            })
            .catch((error) => {
                console.error("Ошибка при обновлении пароля", error);
            });
    };

    private handleUpdateUser = (event: SubmitEvent) => {
        event.preventDefault();

        const target = event.target;

        if (!(target instanceof HTMLFormElement)) {
            return;
        }

        const data = getFormValues<UpdateUserRequest>(target, [
            "email",
            "login",
            "first_name",
            "second_name",
            "display_name",
            "phone",
        ]);

        UsersController.updateUser(data)
            .then(() => {
                this.setProps({ mode: "settings-view" });
            })
            .catch((error) => {
                console.error("Ошибка при обновлении профиля пользователя", error);
            });
    };

    private handleUpdateUserAvatar = (event: SubmitEvent) => {
        event.preventDefault();

        if (!this.props.avatarFile) {
            return;
        }

        const formData = new FormData();
        formData.append("avatar", this.props.avatarFile);

        UsersController.updateAvatar(formData)
            .then(() => {
                this.setProps({ avatarFile: null, modal: null });
            })
            .catch((error) => {
                console.error("Ошибка при обновлении аватара", error);
            });
    };

    private handleUserAvatarChange = (event: Event) => {
        const target = event.target;

        if (!(target instanceof HTMLInputElement)) {
            return;
        }

        if (target && target.id === "update-avatar" && target.files?.length) {
            const avatarFile = target.files[0];

            this.setProps({ avatarFile });
        }
    };
}

export default withUser(SettingsView);
