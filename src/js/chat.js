"use strict";

const socket = io(); // 클라이언트 socketIO 사용

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        send();
    }
});
sendButton.addEventListener("click", send);

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value,
    };

    socket.emit("chatting", param); // 인수1: 채널id, 인수2: 내용
}

socket.on("chatting", (data) => {
    // 서버로 부터 받음
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        const dom = `                    
        <span class="profile">
            <span class="user">${this.name}</span>
            <img class="image" src="https://placeimg.com/50/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;

        li.innerHTML = dom;
        chatList.appendChild(li);
    };
}

// 클라이언트 접속 & 메시지 전달 - socket.emit() -> 서버연결확인 & 전달받음 - io.on() & socket.on()
// 서버에서 클라이언트로 전달 - io.emit() -> 클라이언트 전달받음 - socket.on()
