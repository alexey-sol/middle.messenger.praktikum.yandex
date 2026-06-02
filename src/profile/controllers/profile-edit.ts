import "@/profile/components/profile-form/profile-form";
import { PROFILE_FIELDS } from "../models/constants";
import profileSidebar from "@/profile/components/profile-sidebar/profile-sidebar.hbs?raw";
import { PROFILE_FIELDS_MOCK } from "@/profile/models/mocks";
import profileEditTemplate from "@/profile/views/layouts/profile-edit.hbs?raw";
import "@/profile/views/layouts/styles.scss";
import "@/shared/components/button/button";
import profile from "@/profile/views/layouts/profile.hbs?raw";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { insertElement, logFormValues } from "@/shared/utils/helpers";
import {
    validateEmail,
    validateLogin,
    validateName,
    validatePhone,
} from "@/shared/utils/validators";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);

type ProfileEditViewProps = Pick<FormProps, "fields" | "onSubmit" | "validators"> & {
    displayName: string;
};

class ProfileEditView extends View<ProfileEditViewProps> {
    protected override template = profileEditTemplate;
}

const profileEditView = new ProfileEditView({
    displayName: "Алексей",
    fields: PROFILE_FIELDS_MOCK,
    onSubmit: (event) => logFormValues(event, PROFILE_FIELDS),
    validators: {
        email: validateEmail,
        first_name: validateName,
        login: validateLogin,
        phone: validatePhone,
        second_name: validateName,
    },
});

const viewElement = profileEditView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(ProfileEditView.name);
}

insertElement(viewElement);
