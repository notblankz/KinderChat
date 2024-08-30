import express from "express";

const router = express.Router();

router.get("/chat/:room", (req, res) => {
    const room = req.params.room;
    res.render("chat", { room : room, name : req.session.name});
});

router.post("/chat/:room", (req, res) => {
    res.render("chat", { room: req.params.room, name : req.session.name});
});

export { router as chatRouter };
