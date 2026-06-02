import "@/shared/components/button/button";
import { type ErrorViewProps } from "@/error/types";
import errorTemplate from "@/error/views/layouts/error.hbs?raw";
import { View } from "@/shared/components/view";
import { NoViewElementFoundError } from "@/shared/utils/errors";
import { handleClickNavigate } from "@/shared/utils/handlers";
import "@/error/views/layouts/styles.scss";
import { insertElement } from "@/shared/utils/helpers";

document.addEventListener("click", handleClickNavigate);

class ErrorView extends View<ErrorViewProps> {
    protected override template = errorTemplate;
}

const errorView = new ErrorView({
    description: "Всё пропало",
    title: "500",
});

const viewElement = errorView.element();

if (!viewElement) {
    throw new NoViewElementFoundError(ErrorView.name);
}

insertElement(viewElement);
