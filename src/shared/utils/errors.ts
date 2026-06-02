const NO_VIEW_ELEMENT_FOUND_MESSAGE = "No element found";

export class NoViewElementFoundError extends Error {
    constructor(viewName?: string) {
        super(
            viewName
                ? `${NO_VIEW_ELEMENT_FOUND_MESSAGE}: ${viewName}`
                : NO_VIEW_ELEMENT_FOUND_MESSAGE,
        );
    }
}
