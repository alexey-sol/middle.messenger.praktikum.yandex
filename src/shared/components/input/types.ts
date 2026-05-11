export type InputProps = Partial<
    Pick<HTMLInputElement, "disabled" | "name" | "required" | "type" | "value">
> & {
    label: string;
    variant?: "inline";
};
