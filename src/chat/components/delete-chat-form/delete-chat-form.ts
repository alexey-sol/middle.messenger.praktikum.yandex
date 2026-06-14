import template from "./delete-chat-form.hbs?raw";
import { connect } from "@/app/store/store";
import { type MessengerState } from "@/chat/types";
import "@/shared/components/input/floating-input";
import { Form, type FormProps } from "@/shared/components/form";
import { registerComponent } from "@/shared/utils/templates";
import "./delete-chat-form.scss";

type DeleteChatFormProps = Pick<FormProps, "onSubmit">;

export class DeleteChatForm extends Form<DeleteChatFormProps> {
    static componentName = "DeleteChatForm";

    protected override template = template;
}

const mapStateToProps = (state: MessengerState) => {
    return {
        onSubmit: state.messenger?.form?.deleteChat?.onSubmit,
    };
};

registerComponent(connect(mapStateToProps)(DeleteChatForm));
