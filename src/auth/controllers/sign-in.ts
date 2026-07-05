import "@/auth/components/auth-form/auth-form";
import { type User } from "../api";
import { withUser } from "../utils";
import "@/auth/views/layouts/styles.scss";
import "@/shared/components/button/button";
import auth from "@/auth/views/layouts/auth.hbs?raw";
import "@/shared/components/input/floating-input";
import signInTemplate from "@/auth/views/layouts/sign-in.hbs?raw";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { handleClickNavigate } from "@/shared/utils/handlers";
import Handlebars from "handlebars";

Handlebars.registerPartial("auth", auth);

document.addEventListener("click", handleClickNavigate);

type SignInViewProps = Pick<FormProps, "fields" | "onSubmit" | "validators"> & {
    title: string;
    user?: User;
};

class SignInView extends View<SignInViewProps> {
    protected override template = signInTemplate;
}

export default withUser(SignInView);
