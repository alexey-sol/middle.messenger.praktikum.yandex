import "@/shared/components/button/button";
import "@/shared/components/input/input";
import { SIGN_IN_FIELDS } from "../models/constants";
import auth from "@/auth/views/layouts/auth.hbs?raw";
import signInTemplate from "@/auth/views/layouts/sign-in.hbs?raw";
import { type InputProps } from "@/shared/components/input/types";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { handleClickNavigate } from "@/shared/utils/handlers";
import { insertElement } from "@/shared/utils/helpers";
import Handlebars from "handlebars";
import "@/auth/views/layouts/styles.scss";

Handlebars.registerPartial("auth", auth);

document.addEventListener("click", handleClickNavigate);

type SignInViewProps = {
    fields: Record<string, InputProps>;
    title: string;
};

class SignInView extends View<SignInViewProps> {
    protected override template = signInTemplate;
}

const signInView = new SignInView({
    fields: SIGN_IN_FIELDS,
    title: "Вход",
});

const viewElement = signInView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(SignInView.name);
}

insertElement(viewElement);
