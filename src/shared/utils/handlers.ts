import { router } from "../../app/router";
import { hasToPath, isElement } from "./guards";

export const handleClickNavigate = (event: PointerEvent) => {
    if (!isElement(event.target)) {
        return;
    }

    const button = event.target.closest<HTMLElement>("[data-to]");

    if (hasToPath(button)) {
        event.preventDefault();
        router.go(button.dataset.to);
    }
};
