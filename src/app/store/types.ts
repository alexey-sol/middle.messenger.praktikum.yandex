export type FormState = {
    onChange?: () => void;
    onSubmit?: () => void;
};

export type RequestState<T> = {
    data?: T;
    isLoading?: boolean;
};
