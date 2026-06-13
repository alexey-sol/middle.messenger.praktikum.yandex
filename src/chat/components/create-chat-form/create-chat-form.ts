import createChatFormTemplate from "./create-chat-form.hbs?raw";
import { connect } from "@/app/store/store";
import { type MessengerState } from "@/chat/types";
import { validateChatTitle } from "@/chat/utils/validators";
import "@/shared/components/input/floating-input";
import { Form, type FormProps } from "@/shared/components/form";
import { registerComponent } from "@/shared/utils/templates";
import "./create-chat-form.scss";

type CreateChatFormProps = Pick<FormProps, "onSubmit" | "validators">;

export class CreateChatForm extends Form<CreateChatFormProps> {
    static componentName = "CreateChatForm";

    protected override template = createChatFormTemplate;

    constructor(props: CreateChatFormProps) {
        super(props);
        this.setProps({
            validators: {
                title: validateChatTitle,
            },
        });
    }
}

const mapStateToProps = (state: MessengerState) => {
    return {
        onSubmit: state.messenger?.form?.createChat?.onSubmit,
    };
};

registerComponent(connect(mapStateToProps)(CreateChatForm));
