import { EMPTY_ERROR, setOrResetErrorMessage } from "@/shared/utils/validators";

const VALIDATION_REG_EXP = {
    // eslint-disable-next-line regexp/no-obscure-range -- Кириллица допустима
    chatTitle: /^[A-ZА-ЯЁa-zа-яё0-9]+([\s-][A-ZА-ЯЁa-zа-яё0-9]+)*$/u,
};

export const validateChatTitle = (input: HTMLInputElement) => {
    const value = input.value.trim();
    let message = "";

    if (!value.length) {
        message = EMPTY_ERROR;
    } else if (!VALIDATION_REG_EXP.chatTitle.test(value)) {
        message = "Латиница или кириллица, разрешены цифры и дефис";
    }

    setOrResetErrorMessage(input, message);

    return !message;
};
