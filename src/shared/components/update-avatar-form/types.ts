import { type FormProps } from "../form";
import { type HasAvatarFile } from "@/shared/types";

export type UpdateAvatarFormProps = Partial<HasAvatarFile> & Pick<FormProps, "onSubmit">;
