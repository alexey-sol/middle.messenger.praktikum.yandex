import "@/shared/components/button/button";
import "@/shared/components/input/input";
import { SIGN_UP_FIELDS } from "../models/constants";
import auth from "@/auth/views/layouts/auth.hbs?raw";
import signUpTemplate from "@/auth/views/layouts/sign-up.hbs?raw";
import { type InputProps } from "@/shared/components/input/types";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { handleClickNavigate } from "@/shared/utils/handlers";
import { insertElement } from "@/shared/utils/helpers";
import Handlebars from "handlebars";
import "@/auth/views/layouts/styles.scss";

Handlebars.registerPartial("auth", auth);

document.addEventListener("click", handleClickNavigate);

type SignUpViewProps = {
    fields: Record<string, InputProps>;
    title: string;
};

class SignUpView extends View<SignUpViewProps> {
    protected override template = signUpTemplate;
}

const signUpView = new SignUpView({
    fields: SIGN_UP_FIELDS,
    title: "Регистрация",
});

const viewElement = signUpView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(SignUpView.name);
}

insertElement(viewElement);
