import { APP_ELEMENT_ID } from "../constants";

export const insertElement = (element: Element, parentElementId = APP_ELEMENT_ID) => {
    const parentElement = document.querySelector<HTMLDivElement>(parentElementId);

    if (!parentElement) {
        throw new Error(`Element with id = ${parentElementId} not found`);
    }

    parentElement.append(element);
};

const ALLOWED_TAGS = ["P", "B", "I", "EM", "STRONG", "BR", "SPAN", "DIV"];

export const sanitize = (html: string) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");
    const allElements = document.body.querySelectorAll("*");

    allElements.forEach((element) => {
        if (!ALLOWED_TAGS.includes(element.tagName)) {
            element.replaceWith(...Array.from(element.childNodes));
            return;
        }

        while (element.attributes.length > 0) {
            element.removeAttribute(element.attributes[0].name);
        }
    });

    return document.body.innerHTML;
};

export const navigate = (path: string) => {
    window.location.href = path;
};
