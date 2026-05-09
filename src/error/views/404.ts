import rawTemplate from "../layouts/error.hbs?raw";
import button from "@/shared/components/button/button.hbs?raw";
import { handleClickNavigate } from "@/shared/utils/handlers";
import { insertHtml } from "@/shared/utils/helpers";
import "../layouts/styles.scss";
import Handlebars from "handlebars";

Handlebars.registerPartial("button", button);

document.addEventListener("click", handleClickNavigate);

const template = Handlebars.compile(rawTemplate);

export const renderTemplate = () => {
    return template({
        description: "Не туда попали",
        title: "404",
    });
};

insertHtml(renderTemplate());
