import { type FormProps } from "@/shared/components/form";

export type ToggleChatUserFormProps = Pick<FormProps, "onSubmit" | "validators"> & {
    buttonTitle: string;
};
