import { assertNotToBeNil } from "../utils/tests";
import { Form, type FormProps } from "./form";
import { describe, expect, it, vi } from "vitest";

const LOGIN_FIELD = "login";
const EMAIL_FIELD = "email";

class TestForm extends Form<FormProps> {
    protected template = `
        <form class="{{class}}">
            <input name="${LOGIN_FIELD}" type="text" />
            <input name="${EMAIL_FIELD}" type="email" />
            <button type="submit">Ок</button>
        </form>
    `;
}

describe("Form блок", () => {
    describe("Событие blur и валидация отдельных полей", () => {
        it("Должен вызывать onBlur обработчик, если валидация поля прошла успешно", () => {
            const onBlurMock = vi.fn();
            const validators = {
                [LOGIN_FIELD]: vi.fn().mockReturnValue(true),
            };

            const form = new TestForm({ onBlur: onBlurMock, validators });
            const element = form.element();

            assertNotToBeNil(element);

            const input = element.querySelector<HTMLInputElement>(`input[name="${LOGIN_FIELD}"]`);

            assertNotToBeNil(input);

            input.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

            expect(validators[LOGIN_FIELD]).toHaveBeenCalledWith(input);
            expect(onBlurMock).toHaveBeenCalled();
        });

        it("Не должен вызывать onBlur обработчик, если валидация поля провалилась", () => {
            const onBlurMock = vi.fn();
            const validators = {
                [LOGIN_FIELD]: vi.fn().mockReturnValue(false),
            };

            const form = new TestForm({ onBlur: onBlurMock, validators });
            const element = form.element();

            assertNotToBeNil(element);

            const input = element.querySelector<HTMLInputElement>(`input[name="${LOGIN_FIELD}"]`);

            assertNotToBeNil(input);

            input.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

            expect(validators[LOGIN_FIELD]).toHaveBeenCalled();
            expect(onBlurMock).not.toHaveBeenCalled();
        });

        it("Не должен падать при blur, если валидаторы для этого поля не переданы", () => {
            const onBlurMock = vi.fn();
            const form = new TestForm({ onBlur: onBlurMock });
            const element = form.element();

            assertNotToBeNil(element);

            const input = element.querySelector<HTMLInputElement>(`input[name="${LOGIN_FIELD}"]`);

            assertNotToBeNil(input);

            expect(() => {
                input.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
            }).not.toThrow();
            expect(onBlurMock).not.toHaveBeenCalled();
        });
    });

    describe("Событие change", () => {
        it("Должен вызывать onChange обработчик при изменении состояния элементов формы", () => {
            const onChangeMock = vi.fn();
            const form = new TestForm({ onChange: onChangeMock });
            const element = form.element();

            assertNotToBeNil(element);

            const input = element.querySelector<HTMLInputElement>(`input[name="${LOGIN_FIELD}"]`);

            assertNotToBeNil(input);

            input.dispatchEvent(new Event("change", { bubbles: true }));

            expect(onChangeMock).toHaveBeenCalled();
        });
    });

    describe("Событие submit и общая валидация формы", () => {
        it("Должен вызывать onSubmit обработчик и предотвращать дефолтное поведение, если все поля валидны", () => {
            const onSubmitMock = vi.fn();
            const validators = {
                [EMAIL_FIELD]: vi.fn().mockReturnValue(true),
                [LOGIN_FIELD]: vi.fn().mockReturnValue(true),
            };

            const form = new TestForm({ onSubmit: onSubmitMock, validators });
            const element = form.element();

            assertNotToBeNil(element);

            const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
            const preventDefaultSpy = vi.spyOn(submitEvent, "preventDefault");

            element.dispatchEvent(submitEvent);

            expect(preventDefaultSpy).toHaveBeenCalled();
            expect(validators[LOGIN_FIELD]).toHaveBeenCalled();
            expect(validators[EMAIL_FIELD]).toHaveBeenCalled();
            expect(onSubmitMock).toHaveBeenCalled();
        });

        it("Не должен вызывать onSubmit обработчик, если хотя бы одно поле не прошло валидацию", () => {
            const onSubmitMock = vi.fn();
            const validators = {
                [EMAIL_FIELD]: vi.fn().mockReturnValue(false),
                [LOGIN_FIELD]: vi.fn().mockReturnValue(true),
            };

            const form = new TestForm({ onSubmit: onSubmitMock, validators });
            const element = form.element();

            assertNotToBeNil(element);

            const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
            element.dispatchEvent(submitEvent);

            expect(onSubmitMock).not.toHaveBeenCalled();
        });

        it("Должен успешно отправлять форму, если валидаторы отсутствуют", () => {
            const onSubmitMock = vi.fn();
            const form = new TestForm({ onSubmit: onSubmitMock });
            const element = form.element();

            assertNotToBeNil(element);

            const submitEvent = new Event("submit", { bubbles: true });
            element.dispatchEvent(submitEvent);

            expect(onSubmitMock).toHaveBeenCalled();
        });
    });

    describe("Интеграция с реактивностью базового класса Block", () => {
        it("Должен обновлять DOM и сохранять работоспособность обработчиков после setProps", () => {
            const onSubmitMock = vi.fn();
            const form = new TestForm({ class: "old-class", onSubmit: onSubmitMock });

            let element = form.element();
            expect(element?.classList.contains("old-class")).toBe(true);

            form.setProps({ class: "new-class" });
            element = form.element();

            expect(element?.classList.contains("new-class")).toBe(true);

            element?.dispatchEvent(new Event("submit", { bubbles: true }));
            expect(onSubmitMock).toHaveBeenCalledTimes(1);
        });
    });
});
