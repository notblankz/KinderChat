// import express from "express";
// import { Server } from "socket.io";
// import { createServer } from "http";

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     cors: {
//         origin: "*",
//     },
// });

// io.on("connection", (socket) => {
//     console.log("a user connected");

//     socket.on("new-user-join", (name, room) => {
//         socket.join(room);
//         console.log(`user ${name} joined room ${room}`);
//     });

//     socket.on("send-chat-message", (message) => {
//         io.emit("chat-message", message);
//     });

//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// });

// httpServer.listen(5000, () => {
//     console.log("listening on 5000");
// });

import { createServer } from "http";
import { Server } from "socket.io";
import app from "./index.js";  // Import the Express app

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

// Socket.io event handling
io.on("connection", (socket) => {
    socket.on("new-user-join", (name, room) => {
        socket.join(room);
        console.log(`user ${name} joined room ${room}`);
    });

    socket.on("send-chat-message", (username, message, room) => {
        io.to(room).emit("display-chat-message", {message, username});
        console.log(`Message from ${username} in room ${room}: ${message}`);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

// Start the server
const port = 3000;
httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
