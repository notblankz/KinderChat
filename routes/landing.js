import express  from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("landing");
});

router.post("/", (req, res) => {
    res.redirect("/login");
});

export {
    router as landingRouter
}
