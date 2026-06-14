import { type Indexed, queryStringify } from "../shared/utils/helpers";

type RequestOptions = Partial<Pick<XMLHttpRequest, "responseType" | "timeout">> & {
    data?: FormData | Indexed;
    headers?: Record<string, string>;
    method?: string;
};

const METHODS = {
    DELETE: "DELETE",
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
};

const request = <T = unknown>(url: string, options: RequestOptions = {}, timeout = 5_000) => {
    const { data, headers = {}, method, responseType } = options;

    return new Promise<T>((resolve, reject) => {
        if (!method) {
            reject(new Error("HTTP method is required"));
            return;
        }

        const xhr = new XMLHttpRequest();
        const isGet = method === METHODS.GET;

        xhr.open(
            method,
            isGet && data && !(data instanceof FormData) ? `${url}${queryStringify(data)}` : url,
        );

        if (responseType) {
            xhr.responseType = responseType;
        }

        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key]);
        });

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response;

                if (xhr.responseType) {
                    response = xhr.response;
                } else {
                    try {
                        const contentType = xhr.getResponseHeader("Content-Type");
                        if (contentType && contentType.includes("application/json")) {
                            response = JSON.parse(xhr.responseText);
                        } else {
                            response = xhr.responseText;
                        }
                    } catch {
                        response = xhr.responseText;
                    }
                }

                resolve(response);
            } else {
                reject({
                    request: xhr,
                    response: xhr.responseText,
                    status: xhr.status,
                    statusText: xhr.statusText,
                });
            }
        };

        xhr.onabort = () =>
            reject({
                reason: "Request aborted",
                request: xhr,
            });

        xhr.onerror = () =>
            reject({
                reason: "Network error",
                request: xhr,
            });

        xhr.timeout = timeout;
        xhr.withCredentials = true;

        xhr.ontimeout = () =>
            reject({
                reason: "Request timeout",
                request: xhr,
                timeout,
            });

        if (isGet || !data) {
            xhr.send();
        } else if (data instanceof FormData) {
            xhr.send(data);
        } else if (typeof data === "object") {
            if (!headers["Content-Type"]) {
                xhr.setRequestHeader("Content-Type", "application/json");
            }

            xhr.send(JSON.stringify(data));
        } else {
            xhr.send(data);
        }
    });
};

type HttpRequest = <R>(url: string, options?: RequestOptions) => Promise<R>;

export const HttpTransport = {
    delete: (url, options = {}) => {
        return request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    },
    get: (url, options = {}) => {
        return request(url, { ...options, method: METHODS.GET }, options.timeout);
    },
    post: (url, options = {}) => {
        return request(url, { ...options, method: METHODS.POST }, options.timeout);
    },
    put: (url, options = {}) => {
        return request(url, { ...options, method: METHODS.PUT }, options.timeout);
    },
} satisfies Record<"delete" | "get" | "post" | "put", HttpRequest>;
