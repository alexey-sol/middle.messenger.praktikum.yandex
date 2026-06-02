import "@/auth/components/auth-form/auth-form";
import { SIGN_IN_FIELDS } from "../models/constants";
import auth from "@/auth/views/layouts/auth.hbs?raw";
import "@/auth/views/layouts/styles.scss";
import "@/shared/components/button/button";
import signInTemplate from "@/auth/views/layouts/sign-in.hbs?raw";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { handleClickNavigate } from "@/shared/utils/handlers";
import { insertElement, logFormValues } from "@/shared/utils/helpers";
import { validateLogin, validatePassword } from "@/shared/utils/validators";
import Handlebars from "handlebars";

Handlebars.registerPartial("auth", auth);

document.addEventListener("click", handleClickNavigate);

type SignInViewProps = Pick<FormProps, "fields" | "onSubmit" | "validators"> & {
    title: string;
};

class SignInView extends View<SignInViewProps> {
    protected override template = signInTemplate;
}

const signInView = new SignInView({
    fields: SIGN_IN_FIELDS,
    onSubmit: (event) => logFormValues(event, SIGN_IN_FIELDS),
    title: "Вход",
    validators: {
        login: validateLogin,
        password: validatePassword,
    },
});

const viewElement = signInView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(SignInView.name);
}

insertElement(viewElement);
