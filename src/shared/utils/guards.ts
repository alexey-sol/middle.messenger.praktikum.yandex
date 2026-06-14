export const isElement = (element: unknown): element is HTMLElement =>
    !!element && element instanceof HTMLElement;

type HasToPath = {
    dataset: { to: string };
};

export const hasToPath = (element: HTMLElement | null): element is HasToPath & HTMLElement =>
    !!element && typeof element.dataset.to === "string";
