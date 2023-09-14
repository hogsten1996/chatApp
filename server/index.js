const express = require("express");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const PORT =8081;

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const cors = require('cors');
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Check requests for a token and attach the decoded id to the request
app.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

    try {
        req.user = jwt.verify(token, process.env.JWT);
    } catch {
        req.user = null;
    }

    next();
});

app.use("/auth", require("./auth"));
app.use('/api', require('./api'));

app.get("*/", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
})

app.listen(PORT, ()=>{
    console.log('On port'+PORT)
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
});
