const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { createServer } = require('http');
const { Server } = require('socket.io');

require("dotenv").config();

const PORT = 5000;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const DB = "mongodb://127.0.0.1:27017/SkillMatcher";
mongoose.connect(DB).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

const io = new Server(server, {
  pingTimeout: 10000,
  cors: { origin: "http://localhost:3000" }
});

io.on('connection', (socket) => {
  console.log('Connected to Socket.io');

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    console.log(`User with ID: ${userData._id} connected`);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('new message', (newMessageReceived) => {
    const { sender, receiver } = newMessageReceived;
    socket.to(receiver).emit('message received', newMessageReceived);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", require("./routes/registerUser"));
app.use("/api", require("./routes/Profile"));
app.use("/api", require("./routes/SelectFriend"));
app.use("/api", require("./routes/MakeFriend"));
app.use("/api", require("./routes/Sendcurrentprofile"));
app.use("/api", require("./routes/BoostProfile"));
app.use("/api", require("./routes/MessageRoute"));
app.use("/api", require("./routes/ChatRoute"));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
