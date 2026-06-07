import template from "./update-user-avatar-modal.hbs?raw";
import { type SettingsViewProps } from "@/profile/controllers/settings";
import "@/shared/components/button/button";
import { Block } from "@/shared/components/block";
import "@/styles/modal.scss";
import { registerComponent } from "@/shared/utils/templates";
import "../update-user-avatar-form/update-user-avatar-form";

export type UpdateAvatarModalProps = Pick<SettingsViewProps, "avatarFile"> & {
    isOpen?: boolean;
};

export class UpdateAvatarModal extends Block<UpdateAvatarModalProps> {
    static componentName = "UpdateAvatarModal";

    protected override template = template;
}

registerComponent(UpdateAvatarModal);
