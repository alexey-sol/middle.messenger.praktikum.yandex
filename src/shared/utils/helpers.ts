import { API_BASE_URL, APP_ELEMENT_ID } from "../constants";

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

export const getFormValues = <T>(form: HTMLFormElement, fieldNames: string[]) => {
    return fieldNames.reduce<Record<string, unknown>>((acc, name) => {
        const input = form.elements.namedItem(name);

        if (input instanceof HTMLInputElement) {
            acc[name] = input.value;
        }

        return acc;
    }, {}) as T;
};

// TODO удалить, когда будет API
export const logFormValues = (event: SubmitEvent, fieldNames: string[]) => {
    const form = event.currentTarget;

    if (!(form instanceof HTMLFormElement)) {
        return;
    }

    const values = fieldNames.reduce<Record<string, unknown>>((acc, name) => {
        const input = form.elements.namedItem(name);

        if (input instanceof HTMLInputElement) {
            acc[name] = input.value;
        }

        return acc;
    }, {});
    console.log(values);
};

export const trim = (str: string, chars?: string) => {
    if (typeof str !== "string") {
        return "";
    }

    if (chars === undefined) {
        return str.trim();
    }

    const escapedChars = chars.replaceAll(/[$()*+.?[\\\]^{|}]/gu, "\\$&");
    const regex = new RegExp(`^[${escapedChars}]+|[${escapedChars}]+$`, "gu");

    return str.replace(regex, "");
};

export type Indexed<T = unknown> = {
    [key in string]: T;
};

type PlainObject<T = unknown> = {
    [k in string]: T;
};

const isPlainObject = (value: unknown): value is Indexed => {
    return (
        typeof value === "object" &&
        value !== null &&
        Object.getPrototypeOf(value) === Object.prototype
    );
};

const isArray = (value: unknown): value is [] => {
    return Array.isArray(value);
};

const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
    return isPlainObject(value) || isArray(value);
};

export const cloneDeep = <T extends Indexed>(obj: T) => {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        const arrayClone = [] as unknown as T & unknown[];
        for (const element of obj) {
            arrayClone.push(cloneDeep(element));
        }

        return arrayClone as T;
    }

    if (isPlainObject(obj)) {
        const objectClone: Indexed = {};
        for (const key of Object.keys(obj)) {
            objectClone[key] = cloneDeep((obj as Indexed<T>)[key]);
        }

        return objectClone as T;
    }

    return obj;
};

export const isEqual = (lhs: PlainObject, rhs: PlainObject): boolean => {
    if (lhs === rhs) {
        return true;
    }

    if (typeof lhs !== "object" || lhs === null || typeof rhs !== "object" || rhs === null) {
        return false;
    }

    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];

        if (typeof value === "function" && typeof rightValue === "function") {
            if (value.toString() !== rightValue.toString()) {
                return false;
            }

            continue;
        }

        if (
            isArrayOrObject(value) &&
            isArrayOrObject(rightValue) &&
            typeof value !== "function" &&
            typeof rightValue !== "function"
        ) {
            if (isEqual(value as Indexed, rightValue as Indexed)) {
                continue;
            }

            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
    const result: Indexed = { ...lhs };

    for (const key of Object.keys(rhs)) {
        const lhsValue = lhs[key];
        const rhsValue = rhs[key];

        if (isPlainObject(lhsValue) && isPlainObject(rhsValue)) {
            result[key] = merge(lhsValue, rhsValue);
        } else {
            result[key] = rhsValue;
        }
    }

    return result;
};

export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
    if (typeof path !== "string") {
        throw new TypeError("path must be string");
    }

    if (!isPlainObject(object)) {
        return object;
    }

    const keys = path.split(".");

    let branch: Indexed = { [keys[keys.length - 1]]: value };

    for (let index = keys.length - 2; index >= 0; index--) {
        branch = { [keys[index]]: branch };
    }

    return merge(object, branch);
};

export const queryStringify = (data: Indexed) => {
    if (typeof data !== "object" || data === null) {
        throw new Error("Data must be a non-null object");
    }

    const keys = Object.keys(data);

    if (keys.length === 0) {
        return "";
    }

    return keys.reduce((result, key, index) => {
        if (data[key] === undefined || data[key] === null) {
            return result;
        }

        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(data[key] as string);

        const separator = index < keys.length - 1 ? "&" : "";

        return `${result}${encodedKey}=${encodedValue}${separator}`;
    }, "?");
};

export const equals = (a: unknown, b: unknown) => a === b;

export const reverse = (array: unknown[]) => array.toReversed();

export const getFileUrl = (file?: File) => {
    if (!file) {
        return null;
    }

    return URL.createObjectURL(file);
};

export const getResourceUrl = (resourcePath: string) => {
    return `${API_BASE_URL}/resources/${resourcePath}`;
};
