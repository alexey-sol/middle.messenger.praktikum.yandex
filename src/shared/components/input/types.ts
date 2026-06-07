export type InputProps = Partial<
    Pick<HTMLInputElement, "className" | "disabled" | "placeholder" | "value">
> & {
    error?: string;
    label?: string;
    name: string;
    ref?: string;
    type: string;
    variantClassName?: string;
};
