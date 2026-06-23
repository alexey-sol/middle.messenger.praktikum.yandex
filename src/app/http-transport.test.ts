import { HttpTransport } from "./http-transport";
import { beforeEach, describe, expect, it, vi } from "vitest";

class MockXMLHttpRequest {
    public getResponseHeader = vi.fn();

    public onabort: (() => void) | null = null;

    public onerror: (() => void) | null = null;

    public onload: (() => void) | null = null;

    public ontimeout: (() => void) | null = null;

    public open = vi.fn();

    public response: null | Record<string, unknown> = null;

    public responseText = "";

    public responseType: XMLHttpRequestResponseType = "";

    public send = vi.fn();

    public setRequestHeader = vi.fn();

    public status = 200;

    public statusText = "OK";

    public timeout = 0;

    public withCredentials = false;
}

describe("HttpTransport", () => {
    let mockXhr: MockXMLHttpRequest;

    beforeEach(() => {
        mockXhr = new MockXMLHttpRequest();

        vi.stubGlobal(
            "XMLHttpRequest",
            vi.fn().mockImplementation(function () {
                return mockXhr;
            }),
        );
    });

    describe("Обработка параметров запроса", () => {
        it("GET запрос должен добавлять data в URL в виде query-строки", () => {
            HttpTransport.get("/api/users", { data: { active: "true", role: "admin" } });

            expect(mockXhr.open).toHaveBeenCalledWith("GET", "/api/users?active=true&role=admin");
            expect(mockXhr.send).toHaveBeenCalledWith();
        });

        it("POST запрос с обычным объектом должен автоматически добавлять JSON заголовок и сериализовать body", () => {
            const payload = { name: "Alice" };
            HttpTransport.post("/api/users", { data: payload });

            expect(mockXhr.setRequestHeader).toHaveBeenCalledWith(
                "Content-Type",
                "application/json",
            );
            expect(mockXhr.send).toHaveBeenCalledWith(JSON.stringify(payload));
        });

        it("POST запрос с FormData не должен добавлять JSON заголовок и должен отправлять объект как есть", () => {
            const formData = new FormData();
            formData.append("file", "blob-data");

            HttpTransport.post("/api/upload", { data: formData });

            expect(mockXhr.setRequestHeader).not.toHaveBeenCalledWith(
                "Content-Type",
                "application/json",
            );
            expect(mockXhr.send).toHaveBeenCalledWith(formData);
        });

        it("Должен корректно прокидывать кастомные headers", () => {
            HttpTransport.get("/api/profile", {
                headers: { Authorization: "Bearer token123", "X-Custom-Header": "value" },
            });

            expect(mockXhr.setRequestHeader).toHaveBeenCalledWith(
                "Authorization",
                "Bearer token123",
            );
            expect(mockXhr.setRequestHeader).toHaveBeenCalledWith("X-Custom-Header", "value");
        });
    });

    describe("Обработка успешных ответов (Onload)", () => {
        it("Должен парсить JSON, если пришел заголовок application/json", async () => {
            mockXhr.status = 200;
            mockXhr.responseText = JSON.stringify({ id: 1, success: true });
            mockXhr.getResponseHeader = vi.fn().mockReturnValue("application/json; charset=utf-8");

            const requestPromise = HttpTransport.get("/api/data");

            mockXhr.onload?.();

            const result = await requestPromise;
            expect(result).toEqual({ id: 1, success: true });
        });

        it("Должен возвращать текст как строку, если заголовок ответа не application/json", async () => {
            mockXhr.status = 200;
            mockXhr.responseText = "plain text response";
            mockXhr.getResponseHeader = vi.fn().mockReturnValue("text/plain");

            const requestPromise = HttpTransport.get("/api/text");
            mockXhr.onload?.();

            const result = await requestPromise;
            expect(result).toBe("plain text response");
        });

        it("Должен возвращать свойство response, если явно передан responseType", async () => {
            mockXhr.status = 200;
            mockXhr.response = { blob: "data" };

            const requestPromise = HttpTransport.get("/api/blob", { responseType: "blob" });

            expect(mockXhr.responseType).toBe("blob");
            mockXhr.onload?.();

            const result = await requestPromise;
            expect(result).toEqual({ blob: "data" });
        });
    });

    describe("Обработка ошибок и таймаутов", () => {
        it("Должен реджектить промис, если статус ответа не в диапазоне 200-299", async () => {
            mockXhr.status = 500;
            mockXhr.statusText = "Internal Server Error";
            mockXhr.responseText = "Error detail";

            const requestPromise = HttpTransport.get("/api/fail");
            mockXhr.onload?.();

            await expect(requestPromise).rejects.toEqual({
                request: mockXhr,
                response: "Error detail",
                status: 500,
                statusText: "Internal Server Error",
            });
        });

        it("Должен обрабатывать ошибку сети (onerror)", async () => {
            const requestPromise = HttpTransport.get("/api/network-fail");
            mockXhr.onerror?.();

            await expect(requestPromise).rejects.toEqual({
                reason: "Network error",
                request: mockXhr,
            });
        });

        it("Должен обрабатывать превышение времени ожидания (ontimeout)", async () => {
            const requestPromise = HttpTransport.get("/api/slow", { timeout: 3_000 });

            expect(mockXhr.timeout).toBe(3_000);
            mockXhr.ontimeout?.();

            await expect(requestPromise).rejects.toEqual({
                reason: "Request timeout",
                request: mockXhr,
                timeout: 3_000,
            });
        });
    });
});
