import { clean } from "profanity-cleaner";

const messageDisplay = document.getElementById("message-container");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("messageInp");
const roomName = window.location.pathname.split("/")[2]; // Get the room name from the URL
const senderUsername = document.querySelector("#name").innerText; // put this somehow in the chat.ejs
const exitButton = document.querySelector("#exitButton");

const socket = io("http://10.7.18.12:3000", {
    cors: {
        origin: "*",
    },
});

socket.emit("new-user-join", senderUsername, roomName);

exitButton.addEventListener("click", () => {
    socket.emit("exit-room", senderUsername, roomName);
    window.location.href = "/";
});

messageForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // call the api and stuff here and if it returns true then DONT SEND THE MESSAGE
    const rawMessage = messageInput.value;
    // if it returns false then we can run it thru the profanity filter and send it (just for safety)
    fetch("http://10.7.18.12:8080/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({ message: rawMessage }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.analysis_result) {
                alert("Message is not allowed");
            } else {
                const message = clean(rawMessage);
                if (message) {
                    socket.emit("send-chat-message", senderUsername, message, roomName);
                    messageInput.value = "";
                }
            }
        });
});

socket.on("add-to-list", (name) => {
    const container = document.querySelector(".user-name")
    const userElement = document.createElement("p");
    userElement.innerText = name;
    container.append(userElement);
});

// p -> a(username) br -> message

socket.on("display-chat-message", ({message, username}) => {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = "<a>" + username + ": </a>" + "<br>" + message;
    messageDisplay.append(messageElement);
    if (username === senderUsername) {
        messageElement.classList.add("message-sent");
    } else {
        messageElement.classList.add("message-recieve");
    }
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
});
