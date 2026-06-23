import "@/shared/layouts/app.scss";
import { Block, type BlockOwnProps, type MapEventNameToListenerArgs } from "./block";
import { type InputProps } from "./input/types";

export type FormProps = BlockOwnProps & {
    class?: string;
    fields?: InputProps[];
    onBlur?: (event: FocusEvent) => void;
    onChange?: (event: Event) => void;
    onSubmit?: (event: SubmitEvent) => void;
    validators?: Record<string, (input: HTMLInputElement) => boolean>;
};

export abstract class Form<P extends FormProps> extends Block<P, HTMLFormElement> {
    protected override events: MapEventNameToListenerArgs = {
        blur: {
            listener: (event) => {
                if (!(event.target instanceof HTMLInputElement)) {
                    return;
                }

                const isValid = this.props.validators?.[event.target.name]?.(event.target);

                if (isValid) {
                    this.props.onBlur?.(event);
                }
            },
            useCapture: true,
        },
        change: {
            listener: this.props.onChange,
        },
        submit: {
            listener: (event) => {
                event.preventDefault();

                const form = event.currentTarget;

                if (!(form instanceof HTMLFormElement)) {
                    return;
                }

                let isAllValid = true;

                if (this.props.validators) {
                    Object.entries(this.props.validators).forEach(([name, validator]) => {
                        const input = form.elements.namedItem(name);
                        const isValid = input instanceof HTMLInputElement ? validator(input) : true;

                        if (!isValid) {
                            isAllValid = false;
                        }
                    });
                }

                if (isAllValid) {
                    this.props.onSubmit?.(event);
                }
            },
        },
    };
}
