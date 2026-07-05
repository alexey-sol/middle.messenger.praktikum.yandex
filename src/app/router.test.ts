import { router } from "./router";
import { AuthController } from "@/auth/api";
import { type View } from "@/shared/components/view";
import { createUser } from "@/shared/utils/tests";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/auth/api", () => ({
    AuthController: {
        getUser: vi.fn(),
    },
}));

const createViewMock = () => {
    const showMock = vi.fn();
    const hideMock = vi.fn();

    const Constructor = vi.fn().mockImplementation(function (this: View<{}>) {
        this.show = showMock;
        this.hide = hideMock;
        return this;
    });

    return { Constructor, hideMock, showMock };
};

describe("Router & Route", () => {
    beforeEach(() => {
        window.history.pushState({}, "", "/");
        router.routes = [];
        vi.clearAllMocks();
    });

    describe("Методы регистрации маршрутов", () => {
        it("use() должен корректно добавлять базовый маршрут", () => {
            const { Constructor } = createViewMock();
            router.use("/messenger", Constructor, {});

            expect(router.routes.length).toBe(1);
            expect(router.getRoute("/messenger")).toBeDefined();
        });

        it("useGuest() должен добавлять гостевой маршрут", () => {
            const { Constructor } = createViewMock();
            router.useGuest("/", Constructor, {}, "/messenger");

            const route = router.getRoute("/");
            expect(route?.options).toEqual({ redirectPath: "/messenger", type: "guest" });
        });

        it("usePrivate() должен добавлять внутренний маршрут", () => {
            const { Constructor } = createViewMock();
            router.usePrivate("/settings", Constructor, {}, "/");

            const route = router.getRoute("/settings");
            expect(route?.options).toEqual({ redirectPath: "/", type: "private" });
        });
    });

    describe("Навигация и жизненный цикл", () => {
        it("go() должен менять URL и вызывать render у нового компонента", () => {
            const { Constructor, showMock } = createViewMock();
            router.use("/settings", Constructor, {});

            router.go("/settings");

            expect(window.location.pathname).toBe("/settings");
            expect(Constructor).toHaveBeenCalledTimes(1);
            expect(showMock).toHaveBeenCalledTimes(1);
        });

        it("Должен вызывать leave() у старого роута при переходе на новый", () => {
            const blockA = createViewMock();
            const blockB = createViewMock();

            router.use("/messenger", blockA.Constructor, {});
            router.use("/settings", blockB.Constructor, {});

            router.go("/messenger");
            router.go("/settings");

            expect(blockA.hideMock).toHaveBeenCalledTimes(1);
            expect(blockB.showMock).toHaveBeenCalledTimes(1);
        });

        it("Не должен пересоздавать класс компонента при повторном переходе", () => {
            const { Constructor, showMock } = createViewMock();
            router.use("/messenger", Constructor, {});

            router.go("/messenger");
            router.go("/messenger");

            expect(Constructor).toHaveBeenCalledTimes(1);
            expect(showMock).toHaveBeenCalledTimes(2);
        });
    });

    describe("Защита роутов", () => {
        it("usePrivate: должен редиректить неавторизованного пользователя на redirect URL", async () => {
            vi.mocked(AuthController.getUser).mockResolvedValue(null);
            const goSpy = vi.spyOn(router, "go");

            const { Constructor } = createViewMock();
            router.usePrivate("/settings", Constructor, {}, "/");

            router._onRoute("/settings");

            await vi.waitFor(() => {
                expect(goSpy).toHaveBeenCalledWith("/");
            });
        });

        it("useGuest: должен редиректить авторизованного пользователя со страницы логина на redirect URL", async () => {
            vi.mocked(AuthController.getUser).mockResolvedValue(createUser());
            const goSpy = vi.spyOn(router, "go");

            const { Constructor } = createViewMock();
            router.useGuest("/", Constructor, {}, "/messenger");

            router._onRoute("/");

            await vi.waitFor(() => {
                expect(goSpy).toHaveBeenCalledWith("/messenger");
            });
        });
    });
});
