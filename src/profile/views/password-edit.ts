import profileSidebar from "../components/profile-sidebar/profile-sidebar.hbs?raw";
import profile from "../components/profile/profile.hbs?raw";
import rawTemplate from "../layouts/profile-edit.hbs?raw";
import { PASSWORD_FIELDS_MOCK } from "../mocks";
import "../layouts/styles.scss";
import "@/shared/components/primary-button/primary-button.scss";
import primaryButton from "@/shared/components/primary-button/primary-button.hbs?raw";
import { insertHtml } from "@/shared/utils/helpers";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);
Handlebars.registerPartial("primary-button", primaryButton);

const template = Handlebars.compile(rawTemplate);

export const renderTemplate = () => {
    return template({
        displayName: "Алексей",
        fields: PASSWORD_FIELDS_MOCK,
    });
};

insertHtml(renderTemplate());
