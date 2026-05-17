export type InputProps = Partial<
    Pick<HTMLInputElement, "disabled" | "name" | "placeholder" | "type" | "value">
> & {
    error?: string;
    label?: string;
    ref?: string;
    variant?: "floating" | "inline";
};
