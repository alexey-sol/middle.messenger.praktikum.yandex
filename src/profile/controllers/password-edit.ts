import "@/profile/components/profile-form/profile-form";
import { PASSWORD_FIELDS } from "../models/constants";
import profileSidebar from "@/profile/components/profile-sidebar/profile-sidebar.hbs?raw";
import { PASSWORD_FIELDS_MOCK } from "@/profile/models/mocks";
import passwordEditTemplate from "@/profile/views/layouts/profile-edit.hbs?raw";
import "@/profile/views/layouts/styles.scss";
import "@/shared/components/button/button";
import profile from "@/profile/views/layouts/profile.hbs?raw";
import { type FormProps } from "@/shared/components/form";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { insertElement, logFormValues } from "@/shared/utils/helpers";
import { validatePassword } from "@/shared/utils/validators";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);

type PasswordEditViewProps = Pick<FormProps, "fields" | "onSubmit" | "validators"> & {
    displayName: string;
};

class PasswordEditView extends View<PasswordEditViewProps> {
    protected override template = passwordEditTemplate;
}

const passwordEditView = new PasswordEditView({
    displayName: "Алексей",
    fields: PASSWORD_FIELDS_MOCK,
    onSubmit: (event) => logFormValues(event, PASSWORD_FIELDS),
    validators: {
        confirm_password: validatePassword,
        new_password: validatePassword,
        old_password: validatePassword,
    },
});

const viewElement = passwordEditView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(PasswordEditView.name);
}

insertElement(viewElement);
