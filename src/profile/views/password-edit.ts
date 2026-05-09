import profileSidebar from "../components/profile-sidebar/profile-sidebar.hbs?raw";
import profile from "../components/profile/profile.hbs?raw";
import rawTemplate from "../layouts/profile-edit.hbs?raw";
import { PASSWORD_FIELDS_MOCK } from "../mocks";
import "../layouts/styles.scss";
import button from "@/shared/components/button/button.hbs?raw";
import { insertHtml } from "@/shared/utils/helpers";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);
Handlebars.registerPartial("button", button);

const template = Handlebars.compile(rawTemplate);

export const renderTemplate = () => {
    return template({
        displayName: "Алексей",
        fields: PASSWORD_FIELDS_MOCK,
    });
};

insertHtml(renderTemplate());
