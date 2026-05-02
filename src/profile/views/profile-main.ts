import profileLinks from "../components/profile-links/profile-links.hbs?raw";
import profileSidebar from "../components/profile-sidebar/profile-sidebar.hbs?raw";
import profile from "../components/profile/profile.hbs?raw";
import rawTemplate from "../layouts/profile-main.hbs?raw";
import { DISABLED_PROFILE_FIELDS_MOCK } from "@/profile/mocks";
import "../layouts/styles.scss";
import { insertHtml } from "@/shared/utils/helpers";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);
Handlebars.registerPartial("profile-links", profileLinks);

const template = Handlebars.compile(rawTemplate);

export const renderTemplate = () => {
    return template({
        displayName: "Алексей",
        fields: DISABLED_PROFILE_FIELDS_MOCK,
    });
};

insertHtml(renderTemplate());
