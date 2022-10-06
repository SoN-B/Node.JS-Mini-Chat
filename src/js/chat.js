"use strict";

const socket = io(); // 클라이언트 socketIO 사용

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click", () => {
    const param = {
        name: nickname.value,
        msg: chatInput.value,
    };

    socket.emit("chatting", param); // 인수1: 채널id, 인수2: 내용
});

socket.on("chatting", (data) => {
    // 서버로 부터 받음
    const li = document.createElement("li");
    li.innerText = `${data.name}님이 - ${data.msg}`;
    chatList.appendChild(li);
});

console.log(socket);
