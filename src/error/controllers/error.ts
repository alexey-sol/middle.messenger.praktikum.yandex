import { type ErrorViewProps } from "@/error/types";
import errorTemplate from "@/error/views/layouts/error.hbs?raw";
import "@/error/views/layouts/styles.scss";
import "@/shared/components/button/button";
import { View } from "@/shared/components/view";
import { handleClickNavigate } from "@/shared/utils/handlers";

document.addEventListener("click", handleClickNavigate);

export class ErrorView extends View<ErrorViewProps> {
    protected override template = errorTemplate;
}
