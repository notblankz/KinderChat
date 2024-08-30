const messageDisplay = document.getElementById("message-display");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("messageInp");
const roomName = window.location.pathname.split("/")[2]; // Get the room name from the URL
const senderUsername = document.querySelector("#name").innerText;

const roomNamePattern = /^[A-Za-z]+$/;

const socket = io("http://localhost:3000");

socket.emit("new-user-join", senderUsername, roomName);

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message) {
        socket.emit("send-chat-message", senderUsername, message, roomName);
        messageInput.value = "";
    }
});

socket.on("display-chat-message", ({message, username}) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = `${username}: ${message}`;
    messageDisplay.append(messageElement);
    console.log(senderUsername);
    if (username === senderUsername) {
        // sent message
        messageElement.style.textAlign = "right";
    } else {
        // received message
        messageElement.style.textAlign = "left";
    }
});
