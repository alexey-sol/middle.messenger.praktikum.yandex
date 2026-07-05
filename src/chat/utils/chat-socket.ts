import { type ChatMessage } from "../types";
import { WS_BASE_URL } from "@/shared/constants";

const PING_INTERVAL_MS = 10_000;
const MESSAGE_HISTORY_LIMIT = 20;

type Callbacks = {
    onMessageHistoryReceived: (message: ChatMessage[]) => void;
    onMessageReceived: (message: ChatMessage) => void;
    onUserConnected: (message: ChatMessage) => void;
};

type Params = {
    chatId: number;
    offset: number;
    token: string;
    userId: number;
};

export class ChatSocket {
    private offset = 0;

    private pingIntervalId: null | number = null;

    private ws: null | WebSocket = null;

    constructor(
        { onMessageHistoryReceived, onMessageReceived, onUserConnected }: Callbacks,
        { chatId, offset, token, userId }: Params,
    ) {
        this.offset = offset;

        this.ws = new WebSocket(`${WS_BASE_URL}/chats/${userId}/${chatId}/${token}`);

        this.ws.addEventListener("open", () => {
            this.getMessageHistory();
            this.startPing();
        });

        this.ws.addEventListener("close", (event) => {
            if (!event.wasClean) {
                console.warn(`Обрыв соединения. Код: ${event.code} | Причина: ${event.reason}`);
            }
        });

        this.ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);

            if (Array.isArray(data)) {
                if (data.length === MESSAGE_HISTORY_LIMIT) {
                    this.ws?.send(
                        JSON.stringify({
                            content: this.offset + data.length,
                            type: "get old",
                        }),
                    );

                    this.offset += data.length;
                }

                onMessageHistoryReceived(data);
            } else if (data instanceof Object) {
                switch (data.type) {
                    case "message": {
                        onMessageReceived(data);
                        break;
                    }

                    case "user connected": {
                        onUserConnected(data);
                        break;
                    }
                }
            }
        });

        this.ws.addEventListener("error", (event) => {
            console.log("Ошибка", event);
        });
    }

    public onClose = () => {
        if (this.ws) {
            this.ws.close();
        }

        if (this.pingIntervalId !== null) {
            window.clearInterval(this.pingIntervalId);
            this.pingIntervalId = null;
        }
    };

    public sendMessage = (message: string) => {
        this.ws?.send(
            JSON.stringify({
                content: message,
                type: "message",
            }),
        );
    };

    private getMessageHistory = () => {
        this.ws?.send(
            JSON.stringify({
                content: 0,
                type: "get old",
            }),
        );
    };

    private startPing = () => {
        this.pingIntervalId = window.setInterval(() => {
            this.ws?.send(
                JSON.stringify({
                    type: "ping",
                }),
            );
        }, PING_INTERVAL_MS);
    };
}
