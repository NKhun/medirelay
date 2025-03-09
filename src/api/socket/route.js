import { Server } from "ws";

export default function handler(req, res) {
    if (!res.socket.server.websocket) {
        const wss = new Server({ noServer: true });

        wss.on("connection", ws => {
            ws.on("message", message => {
                wss.clients.forEach(client => {
                    if (client !== ws && client.readyState === 1) {
                        client.send(message);
                    }
                });
            });
        });

        res.socket.server.websocket = wss;
        res.socket.server.on("upgrade", (request, socket, head) => {
            wss.handleUpgrade(request, socket, head, ws => {
                wss.emit("connection", ws, request);
            });
        });
    }
    res.end();
}
