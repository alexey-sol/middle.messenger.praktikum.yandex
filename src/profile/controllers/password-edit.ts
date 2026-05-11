import "@/shared/components/button/button";
import "@/shared/components/input/input";
import { PASSWORD_FIELDS_MOCK } from "@/profile/models/mocks";
import profileSidebar from "@/profile/views/components/profile-sidebar/profile-sidebar.hbs?raw";
import passwordEditTemplate from "@/profile/views/layouts/profile-edit.hbs?raw";
import profile from "@/profile/views/layouts/profile.hbs?raw";
import { type InputProps } from "@/shared/components/input/types";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { insertElement } from "@/shared/utils/helpers";
import "@/profile/views/layouts/styles.scss";
import Handlebars from "handlebars";

Handlebars.registerPartial("profile-sidebar", profileSidebar);
Handlebars.registerPartial("profile", profile);

type PasswordEditViewProps = {
    displayName: string;
    fields: InputProps[];
};

class PasswordEditView extends View<PasswordEditViewProps> {
    protected override template = passwordEditTemplate;
}

const passwordEditView = new PasswordEditView({
    displayName: "Алексей",
    fields: PASSWORD_FIELDS_MOCK,
});

const viewElement = passwordEditView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(PasswordEditView.name);
}

insertElement(viewElement);
