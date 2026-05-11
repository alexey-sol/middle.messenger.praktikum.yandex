import "@/shared/components/input/input";
import { DISABLED_PROFILE_FIELDS_MOCK } from "@/profile/models/mocks";
import profileSidebar from "@/profile/views/components/profile-sidebar/profile-sidebar.hbs?raw";
import profileMainTemplate from "@/profile/views/layouts/profile-main.hbs?raw";
import profile from "@/profile/views/layouts/profile.hbs?raw";
import { type InputProps } from "@/shared/components/input/types";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import "@/profile/views/layouts/profile-main.scss";
import { insertElement } from "@/shared/utils/helpers";
import "@/profile/views/layouts/styles.scss";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);

type ProfileMainViewProps = {
    displayName: string;
    fields: InputProps[];
};

class ProfileMainView extends View<ProfileMainViewProps> {
    protected override template = profileMainTemplate;
}

const profileMainView = new ProfileMainView({
    displayName: "Алексей",
    fields: DISABLED_PROFILE_FIELDS_MOCK,
});

const viewElement = profileMainView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(ProfileMainView.name);
}

insertElement(viewElement);
