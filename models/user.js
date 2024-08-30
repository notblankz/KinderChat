import pg from "pg";

const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "kinderchat",
    password: "password",
    port: 5432,
});

export function dbConnect() {
    return pool; 
}