const express = require("express");
const app = express();
const socket = require("socket.io");
const cors= require('cors');

app.use(cors({origin:'*'}));

const server= app.listen(4002,()=>{
    console.log("listening to port 4002");
});

app.use(express.json());

const io = socket(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
    }
});


io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});