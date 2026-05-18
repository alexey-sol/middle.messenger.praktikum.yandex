/* eslint-disable regexp/no-obscure-range -- Кириллица допустима */
export const EMPTY_ERROR = "Не должно быть пустым";

const VALIDATION_REG_EXP = {
    email: /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/u,
    login: /^(?=.*[a-zA-Z])[\w-]+$/u,
    name: /^[A-ZА-ЯЁ][a-zа-яё]*(-[A-ZА-ЯЁa-zа-яё]+)*$/u,
    password: /^(?=.*[A-ZА-ЯЁ])(?=.*\d).+$/u,
    phone: /^\+?\d+$/u,
};

export const setOrResetErrorMessage = (input: HTMLInputElement, message?: string) => {
    if (!message) {
        input.setCustomValidity("");
        return;
    }

    input.setCustomValidity(message);

    const errorMessage = input.closest("[data-component]")?.querySelector("[data-error]");

    if (errorMessage) {
        errorMessage.textContent = message;
    }
};

export const validateEmail = (input: HTMLInputElement) => {
    const value = input.value.trim();
    let message = "";

    if (!value.length) {
        message = EMPTY_ERROR;
    } else if (!VALIDATION_REG_EXP.email.test(value)) {
        message = "Неверный формат email";
    }

    setOrResetErrorMessage(input, message);

    return !message;
};

export const validateName = (input: HTMLInputElement) => {
    const value = input.value.trim();
    let message = "";

    if (!value.length) {
        message = EMPTY_ERROR;
    } else if (!VALIDATION_REG_EXP.name.test(value)) {
        message = "Латиница или кириллица, с заглавной, разрешён дефис";
    }

    setOrResetErrorMessage(input, message);

    return !message;
};

const MIN_LOGIN_LENGTH = 3;
const MAX_LOGIN_LENGTH = 20;

export const validateLogin = (input: HTMLInputElement) => {
    const value = input.value.trim();
    let message = "";

    if (value.length < MIN_LOGIN_LENGTH || value.length > MAX_LOGIN_LENGTH) {
        message = `Не меньше ${MIN_LOGIN_LENGTH} и не больше ${MAX_LOGIN_LENGTH} символов`;
    } else if (!VALIDATION_REG_EXP.login.test(value)) {
        message = "Латиница и опционально цифры, без пробелов";
    }

    setOrResetErrorMessage(input, message);

    return !message;
};

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 40;

export const validatePassword = (input: HTMLInputElement) => {
    const value = input.value.trim();
    let message = "";

    if (value.length < MIN_PASSWORD_LENGTH || value.length > MAX_PASSWORD_LENGTH) {
        message = `Не меньше ${MIN_PASSWORD_LENGTH} и не больше ${MAX_PASSWORD_LENGTH} символов`;
    } else if (!VALIDATION_REG_EXP.password.test(value)) {
        message = "Минимум одна заглавная буква и одна цифра";
    }

    setOrResetErrorMessage(input, message);

    return !message;
};

const MIN_PHONE_LENGTH = 10;
const MAX_PHONE_LENGTH = 15;

export const validatePhone = (input: HTMLInputElement) => {
    const value = input.value.trim();
    let message = "";

    if (value.length < MIN_PHONE_LENGTH || value.length > MAX_PHONE_LENGTH) {
        message = `Не меньше ${MIN_PHONE_LENGTH} и не больше ${MAX_PHONE_LENGTH} символов`;
    } else if (!VALIDATION_REG_EXP.phone.test(value)) {
        message = "Цифры, может начинаться с плюса";
    }

    setOrResetErrorMessage(input, message);

    return !message;
};
