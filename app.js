const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app); // express가 http로 통해서 실행 (웹소켓이기에 http가 필요함)
const socketIO = require("socket.io");
const moment = require("moment");

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    // 연결이 이루어지면 그에 관련된 정보가 socket에 담겨짐
    console.log(socket.id + ": Connection");

    socket.on("chatting", (data) => {
        const { name, msg } = data;
        io.emit("chatting", {
            // 접속된 모든 클라이언트에게 메시지를 전송한다
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:mm A"),
        });
    });

    socket.on("disconnect", () => {
        console.log(socket.id + ": Disconnection");
        clearInterval(socket.interval);
    });

    // 클라이언트로 메세지 보내기
    // socket.interval = setInterval(() => {
    //     // 1초마다 클라이언트로 메시지 전송
    //     socket.emit("chatting", {
    //         name: "Server",
    //         msg: "Hello have a nice day!",
    //         time: moment(new Date()).format("h:mm A"),
    //     });
    // }, 1000);

    // 에러 시
    socket.on("error", (error) => {
        console.error(error);
    });
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
