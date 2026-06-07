import { router } from "./app/router";
import { AuthController, type SignInRequest, type SignUpRequest } from "./auth/api";
import SignInView from "./auth/controllers/sign-in";
import SignUpView from "./auth/controllers/sign-up";
import { SIGN_IN_FIELDS, SIGN_UP_FIELDS } from "./auth/models/constants";
import {
    ATTACH_DROPDOWN_ITEMS,
    SEND_MESSAGE_FORM_FIELDS,
    SETTINGS_DROPDOWN_ITEMS,
} from "./chat/constants";
import { ErrorView } from "./error/controllers/error";
import SettingsView from "./profile/controllers/settings";
import { getFormValues, logFormValues } from "./shared/utils/helpers";
import {
    EMPTY_ERROR,
    setOrResetErrorMessage,
    validateEmail,
    validateLogin,
    validateName,
    validatePassword,
    validatePhone,
} from "./shared/utils/validators";
import ChatView from "@/chat/controllers/chat";

router
    .useGuest(
        "/",
        SignInView,
        {
            fields: SIGN_IN_FIELDS,
            onSubmit: async (event) => {
                if (!(event.currentTarget instanceof HTMLFormElement)) {
                    return;
                }

                const data = getFormValues<SignInRequest>(
                    event.currentTarget,
                    SIGN_IN_FIELDS.map(({ name }) => name),
                );

                AuthController.signIn(data)
                    .then(() => {
                        router.go("/messenger");
                    })
                    .catch((error) => {
                        console.error("Ошибка при входе", error);
                    });
            },
            title: "Вход",
            validators: {
                login: validateLogin,
                password: validatePassword,
            },
        },
        "/messenger",
    )
    .use("/sign-up", SignUpView, {
        fields: SIGN_UP_FIELDS,
        onSubmit: async (event) => {
            if (!(event.currentTarget instanceof HTMLFormElement)) {
                return;
            }

            const data = getFormValues<SignUpRequest>(
                event.currentTarget,
                SIGN_UP_FIELDS.map(({ name }) => name),
            );

            AuthController.signUp(data)
                .then(() => {
                    router.go("/messenger");
                })
                .catch((error) => {
                    console.error("Ошибка при регистрации", error);
                });
        },
        title: "Регистрация",
        validators: {
            confirm_password: validatePassword,
            email: validateEmail,
            first_name: validateName,
            login: validateLogin,
            password: validatePassword,
            phone: validatePhone,
            second_name: validateName,
        },
    })
    .usePrivate("/messenger", ChatView, {
        attachDropdownItems: ATTACH_DROPDOWN_ITEMS,
        fields: SEND_MESSAGE_FORM_FIELDS,
        onSubmit: (event) =>
            logFormValues(
                event,
                SEND_MESSAGE_FORM_FIELDS.map(({ name }) => name),
            ),
        settingsDropdownItems: SETTINGS_DROPDOWN_ITEMS,
        validators: {
            message: (input: HTMLInputElement) => {
                const value = input.value.trim();
                const message = value.length ? "" : EMPTY_ERROR;

                setOrResetErrorMessage(input, message);

                return !message;
            },
        },
    })
    .usePrivate("/settings", SettingsView, {
        mode: "settings-view",
        validators: {
            confirm_password: validatePassword,
            email: validateEmail,
            first_name: validateName,
            login: validateLogin,
            new_password: validatePassword,
            old_password: validatePassword,
            password: validatePassword,
            phone: validatePhone,
            second_name: validateName,
        },
    })
    .use("/404", ErrorView, {
        description: "Не туда попали",
        title: "404",
    })
    .use("/500", ErrorView, {
        description: "Всё пропало",
        title: "500",
    })
    .start();
