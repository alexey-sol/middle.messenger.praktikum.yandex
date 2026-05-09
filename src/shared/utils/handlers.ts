import { hasToPath, isElement } from "./guards";
import { navigate } from "./helpers";

export const handleClickNavigate = (event: PointerEvent) => {
    if (!isElement(event.target)) {
        return;
    }

    const button = event.target.closest<HTMLButtonElement>("[data-to]");

    if (hasToPath(button)) {
        navigate(button.dataset.to);
    }
};
