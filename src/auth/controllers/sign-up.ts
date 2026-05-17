import "@/auth/components/auth-form/auth-form";
import { SIGN_UP_FIELDS } from "../models/constants";
import auth from "@/auth/views/layouts/auth.hbs?raw";
import "@/auth/views/layouts/styles.scss";
import "@/shared/components/button/button";
import signUpTemplate from "@/auth/views/layouts/sign-up.hbs?raw";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { handleClickNavigate } from "@/shared/utils/handlers";
import { insertElement, logFormValues } from "@/shared/utils/helpers";
import {
    validateEmail,
    validateLogin,
    validateName,
    validatePassword,
    validatePhone,
} from "@/shared/utils/validators";
import Handlebars from "handlebars";

Handlebars.registerPartial("auth", auth);

document.addEventListener("click", handleClickNavigate);

type SignUpViewProps = Pick<FormProps, "fields" | "onSubmit" | "validators"> & {
    title: string;
};

class SignUpView extends View<SignUpViewProps> {
    protected override template = signUpTemplate;
}

const signUpView = new SignUpView({
    fields: SIGN_UP_FIELDS,
    onSubmit: (event) => logFormValues(event, SIGN_UP_FIELDS),
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
});

const viewElement = signUpView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(SignUpView.name);
}

insertElement(viewElement);
