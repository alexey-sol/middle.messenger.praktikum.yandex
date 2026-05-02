import { SIGN_IN_FIELDS } from "../constants";
import auth from "../layouts/auth.hbs?raw";
import rawTemplate from "../layouts/sign-in.hbs?raw";
import button from "@/shared/components/button/button.hbs?raw";
import { insertHtml } from "@/shared/utils/helpers";
import Handlebars from "handlebars";
import "../layouts/styles.scss";

Handlebars.registerPartial("button", button);
Handlebars.registerPartial("auth", auth);

const template = Handlebars.compile(rawTemplate);

export const renderTemplate = () => {
    return template({
        fields: SIGN_IN_FIELDS,
        title: "Вход",
    });
};

insertHtml(renderTemplate());
