import express from "express";
import { WebSocketServer } from "ws";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
const app = express();
const sockServer = new WebSocketServer({ port: 443 });

app.use((_req,res) => {
    res.sendFile(path.join(__dirname, "src/views", "group-chat.html"));
});

app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});

sockServer.on("connection", (ws) => {

    console.log("New client connected");

    ws.on("close", () => console.log("Connection closed with the server"));

    ws.on("message", (data) => {
        sockServer.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`${data}`);
            }
        });
    });

    ws.onerror = function () {
        console.log("An error occured: ", error);
    }
})