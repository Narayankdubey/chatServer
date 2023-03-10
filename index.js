//Node Server which will handle socket.io connection

const PORT = process.env.PORT || 8000;

const io = require("socket.io")(PORT,{
    cors: {
      origin: ["https://batiyawo.netlify.app","http://localhost:3000"],
      methods: ["GET", "POST"]
    }
  })

const users = {};

io.on("connection", socket => {
    socket.on("new-user-joined", name => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name)
    });

    socket.on("send", message => {
        socket.broadcast.emit("receive", { message: message, name: users[socket.id] })
    });
    socket.on("disconnect", message => {
        socket.broadcast.emit("left",  users[socket.id]);
        delete users[socket.id]
    });
})