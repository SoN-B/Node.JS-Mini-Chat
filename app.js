const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app); // express가 http로 통해서 실행 (웹소켓이기에 http가 필요함)
const socketIO = require("socket.io");

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    // 연결이 이루어지면 그에 관련된 정보가 socket에 담겨짐
    socket.on("chatting", (data) => {
        io.emit("chatting", data);
    });
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
