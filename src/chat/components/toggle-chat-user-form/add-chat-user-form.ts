import template from "./template.hbs?raw";
import { type ToggleChatUserFormProps } from "./types";
import { connect } from "@/app/store/store";
import { type MessengerState } from "@/chat/types";
import { Form } from "@/shared/components/form";
import "./styles.scss";
import { registerComponent } from "@/shared/utils/templates";
import "@/shared/components/input/floating-input";
import { validateLogin } from "@/shared/utils/validators";

export class AddChatUserForm extends Form<ToggleChatUserFormProps> {
    static componentName = "AddChatUserForm";

    protected override template = template;

    constructor(props: ToggleChatUserFormProps) {
        super(props);
        this.setProps({
            buttonTitle: "Добавить",
            validators: {
                login: validateLogin,
            },
        });
    }
}

const mapStateToProps = (state: MessengerState) => {
    return {
        onSubmit: state.messenger?.form?.addChatUser?.onSubmit,
    };
};

registerComponent(connect(mapStateToProps)(AddChatUserForm));
