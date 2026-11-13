const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { Pool } = require("pg");

const app = express();
app.use(cors());

const password = fs.readFileSync("/run/secrets/db_password", "utf8").trim();

const pool = new Pool({
    host: "db",
    user: process.env.POSTGRES_USER,
    password,
    database: process.env.POSTGRES_DB,
    port: 5432,
});

app.get("/status", async (req, res) => {
    try {
        const r = await pool.query("SELECT NOW() as HEURE");
        res.json({ message: "Connexion PostgreSQL réussie !", heure_db: r.rows[0].heure });
    } catch (err) {
        res.status(500).json({ erreur: err.message });
    }
});

app.listen(5000, "0.0.0.0", () => console.log("API démarrée sur le port 5000"));