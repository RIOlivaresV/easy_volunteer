const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
var route = express.Router();
const profile = require("./routes/profileRouter");
const post = require("./routes/postRouter");
const conversation = require("./routes/conversationRouter");
const message = require("./routes/messageRoute");
const mongooseUrl =
  "mongodb+srv://admin:Isai5440@cluster0.hqfxb.mongodb.net/EasyVolunteer?retryWrites=true&w=majority";

const port = 8000;

//Allow pre-flight checks
const corsOptions = {
  origin: "*",
};

app.use(cors());

app.use(bodyParser.json());

app.use("/", profile);
app.use("/post", post);
app.use("/conversation", conversation);
app.use("/message", message);

const server = http.createServer(app);
const io = socketio(server);

app.listen(port, () => {
  console.log(`Web Service Listening on port ${port}`);
  console.log(`Connecting to MongoDB on: ${mongooseUrl}`);
  mongoose.connect(mongooseUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});
