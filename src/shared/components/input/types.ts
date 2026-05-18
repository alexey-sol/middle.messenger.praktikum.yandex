export type InputProps = Partial<Pick<HTMLInputElement, "disabled" | "placeholder" | "value">> & {
    error?: string;
    label?: string;
    name: string;
    ref?: string;
    type: string;
    variant?: "floating" | "inline";
};
