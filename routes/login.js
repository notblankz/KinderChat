import express from "express";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import { dbConnect } from "../models/user.js";
import session from "express-session";

const router = express.Router();
const db = dbConnect();

router.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const email = req.body.email;

    const query = "SELECT * FROM users WHERE email = $1";
    db.query(query, [email], async (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            res.send("Error executing query");
        } else {
            if (result.rows.length > 0) {
                const isMatch = await bcrypt.compare(req.body.password, result.rows[0].password);
                if (isMatch) {
                    req.session.name = result.rows[0].username;  // Store name in session
                    res.redirect('/joinRoom');  // Redirect to landing page if credentials are valid
                } else {
                    res.send("Invalid credentials");  // Send error message if password doesn't match
                }
            } else {
                res.send("Email not found");  // Send error message if email is not found
            }
        }
    });
});

export {
    router as loginRouter
};
