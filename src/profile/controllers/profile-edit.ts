import "@/shared/components/button/button";
import "@/shared/components/input/input";
import { PROFILE_FIELDS_MOCK } from "@/profile/models/mocks";
import profileSidebar from "@/profile/views/components/profile-sidebar/profile-sidebar.hbs?raw";
import profileEditTemplate from "@/profile/views/layouts/profile-edit.hbs?raw";
import profile from "@/profile/views/layouts/profile.hbs?raw";
import { type InputProps } from "@/shared/components/input/types";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { insertElement } from "@/shared/utils/helpers";
import "@/profile/views/layouts/styles.scss";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);

type ProfileEditViewProps = {
    displayName: string;
    fields: InputProps[];
};

class ProfileEditView extends View<ProfileEditViewProps> {
    protected override template = profileEditTemplate;
}

const profileEditView = new ProfileEditView({
    displayName: "Алексей",
    fields: PROFILE_FIELDS_MOCK,
});

const viewElement = profileEditView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(ProfileEditView.name);
}

insertElement(viewElement);
