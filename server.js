import { createServer } from "http";
import { Server } from "socket.io";
import app from "./index.js";  // Import the Express app
import { dbConnect } from "./models/user.js";
import dotenv from "dotenv";

dotenv.config();

const db = dbConnect();
let participants;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Socket.io event handling
io.on("connection", (socket) => {

    socket.on("new-user-join", async (name, room) => {

        try {
            const query = "SELECT * FROM rooms WHERE roomname = $1";
            const result = await db.query(query, [room]);
            if (result.rows.length === 0) {
                participants = {participants: [name]};
                const insertQuery = "INSERT INTO rooms (roomname, participants) VALUES ($1, $2)";
                await db.query(insertQuery, [room, participants]);
            } else {
                participants = result.rows[0].participants;
                if (!participants.participants.includes(name)) {
                    participants.participants.push(name);
                }
                const updateQuery = "UPDATE rooms SET participants = $1 WHERE roomname = $2";
                await db.query(updateQuery, [participants, room]);
            }

            console.log(participants);
            io.to(room).emit("update-list", participants);
            socket.join(room);
            socket.emit("update-list", participants);
            console.log(`user ${name} joined room ${room}`);
        } catch (err) {
            console.error("Error executing query", err.stack);
        }

    });

    socket.on("send-chat-message", (username, message, room) => {
        io.to(room).emit("display-chat-message", {message, username});
    });

    socket.on("exit-room", async (username, room) => {

        try {
            const query = "SELECT * FROM rooms WHERE roomname = $1";
            const result = await db.query(query, [room]);
            participants = result.rows[0].participants;
            const index = participants.participants.indexOf(username);
            participants.participants.splice(index, 1);
            if (participants.participants.length === 0) {
                const deleteQuery = "DELETE FROM rooms WHERE roomname = $1";
                await db.query(deleteQuery, [room]);
            } else {
                const updateQuery = "UPDATE rooms SET participants = $1 WHERE roomname = $2";
                await db.query(updateQuery, [participants, room]);
            }
            socket.leave(room);
            io.to(room).emit("update-list", participants);
            console.log(`user ${username} left room ${room}`);
        } catch (err) {
            console.error("Error executing query", err.stack);
        }

    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

// Start the server
const port = process.env.PORT || 3000;
const host = process.env.HOST;
httpServer.listen(port, host, () => {
    console.log(`Server running on port ${port}`);
});
