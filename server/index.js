const express = require("express");
const app = express();
const ViteExpress = require("vite-express");
const http = require("http"); // Import the HTTP module
const socketIO = require("socket.io"); // Import Socket.IO
const path = require("path");
const jwt = require("jsonwebtoken");

const PORT = 8081;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

ViteExpress.config({ mode: "production" });

const cors = require("cors");
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

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

const server = http.createServer(app); // Create an HTTP server
const io = socketIO(server); // Pass the HTTP server instance to Socket.IO

io.on("connection", (socket) => {
  console.log("A user connected");

  // Add your Socket.IO event handlers here

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log("On port" + PORT);
});

ViteExpress.bind(app, server);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

