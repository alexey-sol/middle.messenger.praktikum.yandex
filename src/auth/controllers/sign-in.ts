import "@/auth/components/auth-form/auth-form";
import { type AuthState } from "../types";
import { withUser } from "../utils";
import "@/auth/views/layouts/styles.scss";
import "@/shared/components/input/floating-input";
import "@/shared/components/button/button";
import auth from "@/auth/views/layouts/auth.hbs?raw";
import signInTemplate from "@/auth/views/layouts/sign-in.hbs?raw";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { handleClickNavigate } from "@/shared/utils/handlers";
import Handlebars from "handlebars";

Handlebars.registerPartial("auth", auth);

document.addEventListener("click", handleClickNavigate);

type SignInViewProps = Pick<FormProps, "fields" | "onSubmit" | "validators"> & {
    title: string;
    user?: Required<AuthState>["auth"]["user"];
};

class SignInView extends View<SignInViewProps> {
    protected override template = signInTemplate;
}

export default withUser(SignInView);
