const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUSer = (socketId) => {
  users = users.filter((user) => user.socketId != socketId);
};

const getUser = (userId) => {
  const user = users.find((user) => user.userId === userId);
  console.log("find user");
  console.log(user);
  return user;
};

io.on("connection", (socket) => {
  // const user = getU;
  console.log("User connected");
  console.log("users total");
  console.log(users);
  // io.emit("Welcome", "Hello this is socket s ervice");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessge", ({ userId, recieverId, text }) => {
    const user = getUser(recieverId);
    console.log("test");
    console.log(text);
    io.to(user.socketId).emit("getMessage", {
      userId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("User deconnected");
    removeUSer(socket.id);
    io.emit("getUsers", users);
  });
});
