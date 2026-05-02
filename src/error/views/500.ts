import rawTemplate from "../layouts/error.hbs?raw";
import button from "@/shared/components/button/button.hbs?raw";
import { insertHtml } from "@/shared/utils/helpers";
import Handlebars from "handlebars";
import "../layouts/styles.scss";

Handlebars.registerPartial("button", button);

const template = Handlebars.compile(rawTemplate);

export const renderTemplate = () => {
    return template({
        description: "Всё пропало",
        title: "500",
    });
};

insertHtml(renderTemplate());
