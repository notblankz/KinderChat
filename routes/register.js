import express from "express";
import { dbConnect } from "../models/user.js";
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';

const db = dbConnect();
const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  let id = uuidv4();

    const query = "INSERT INTO users (id, name, password, email) VALUES ($1, $2, $3, $4)";
    db.query(query, [id, name, hashedPassword, email], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
        } else {
            console.log("User registered successfully");
        }
    });
    res.redirect("/joinRoom");
});

export { router as registerRouter };
