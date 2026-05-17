import "@/profile/components/profile-form/profile-form";
import profileSidebar from "@/profile/components/profile-sidebar/profile-sidebar.hbs?raw";
import { DISABLED_PROFILE_FIELDS_MOCK } from "@/profile/models/mocks";
import profileMainTemplate from "@/profile/views/layouts/profile-main.hbs?raw";
import "@/profile/views/layouts/profile-main.scss";
import profile from "@/profile/views/layouts/profile.hbs?raw";
import "@/profile/views/layouts/styles.scss";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { insertElement } from "@/shared/utils/helpers";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);

type ProfileMainViewProps = Pick<FormProps, "fields"> & {
    displayName: string;
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
