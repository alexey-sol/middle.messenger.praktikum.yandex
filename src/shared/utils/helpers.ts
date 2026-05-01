import { APP_ELEMENT_ID } from "../constants";

export const insertHtml = (html: string, elementId = APP_ELEMENT_ID) => {
    const element = document.querySelector<HTMLDivElement>(elementId);

    if (!element) {
        throw new Error(`Element with id = ${elementId} not found`);
    }

    element.insertAdjacentHTML("beforeend", html);
};

// TODO implement
export const sanitize = (string: string) => {
    return string;
};
