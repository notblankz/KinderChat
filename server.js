import { createServer } from "http";
import { Server } from "socket.io";
import app from "./index.js";  // Import the Express app

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Socket.io event handling
io.on("connection", (socket) => {
    socket.on("new-user-join", (name, room) => {
        socket.join(room);
        io.to(room).emit("add-to-list", name);
        console.log(`user ${name} joined room ${room}`);
    });

    socket.on("send-chat-message", (username, message, room) => {
        io.to(room).emit("display-chat-message", {message, username});
        console.log(`Message from ${username} in room ${room}: ${message}`);
    });

    socket.on("exit-room", (username, room) => {
        socket.leave(room);
        console.log(`user ${username} left room ${room}`);
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
