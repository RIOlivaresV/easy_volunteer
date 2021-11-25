import React, { Component, useRef } from "react";
import Box from "@mui/material/Box";
import Message from "../Message/Message";
import * as consts from "../../util/const";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";

class Conversation extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: "",
      messages: [],
      message: "",
      conversation: {},
      socket: {},
      arrivalMessage: null,
      ref: null,
    };
    this.getUser = this.getUser.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
    this.getMessagesSocket = this.getMessagesSocket.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.reference = React.createRef();
  }

  // componentDidMount() {
  //   this.scrollToBottom();
  // }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.state.ref != null) {
      this.state.ref.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentDidMount() {
    console.log("state converdaion");
    console.log(this.props.location.state);
    this._isMounted = true;
    if (this.props.location.state == undefined) {
      this.props.history.push("/Chat");
    } else {
      this.setState({ ...this.state, conversation: this.props.location.state });
      this.getUser();
      this.getMessages();
      if (this.props.active) {
        this.reference.current.scrollIntoView();
      }
    }

    const socket = io(`${consts.skt}`);
    this.setState({ ...this.state, socket: socket });
    socket.emit("addUser", sessionStorage.getItem("id"));
    socket.on("getMessage", (data) => {
      this.getMessagesSocket(data);
      this.scrollToBottom();
      console.log("Data on get message");
      console.log(data);
    });
  }

  getMessagesSocket(data) {
    this._isMounted = false;
    console.log("get messages socket");
    console.log(this.state);
    this.setState({
      ...this.state,
      messages: [
        ...this.state.messages,
        {
          senderId: data.userId,
          text: data.text,
          createdAt: Date.now(),
        },
      ],
    });
  }

  getUser() {
    const fID = this.props.location.state.member.find(
      (m) => m !== sessionStorage.getItem("id")
    );
    fetch(`${consts.svr}` + "/profile/" + fID, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        let profile = user.collection;
        // console.log("user from database");
        // console.log(profile);
        this.setState({
          user: profile,
        });
      });
  }

  getMessages() {
    fetch(`${consts.svr}` + "/message/" + this.props.location.state._id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((message) => {
        this.setState({ ...this.state, messages: message });
      });
  }

  sendMessage(e) {
    const socket = this.state.socket;
    socket.emit("sendMessge", {
      userId: sessionStorage.getItem("id"),
      recieverId: this.state.user._id,
      text: this.state.message,
    });
    this.setState({ ...this.state, message: "" });
    fetch(`${consts.svr}` + "/message/", {
      method: "POST",
      body: JSON.stringify({
        senderId: sessionStorage.getItem("id"),
        conversationId: this.props.location.state._id,
        text: this.state.message,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((message) => {
        // console.log("messages");
        // console.log(message);
        this.setState({ ...this.state, messages: message });
      });
  }

  saveMessage(e) {
    this.setState({ ...this.state, message: e.target.value });
  }
  render() {
    const currentUser = sessionStorage.getItem("id");

    return (
      <div>
        <h1>{"Message with: " + this.state.user.name}</h1>
        <div className=" justify-content-center pt-5wf4">
          <Box
            fullWidth
            sx={{
              maxWidth: "md",
              mx: "auto",
              height: "80vh",
              maxHeight: "80vh",
              backgroundColor: "white",
              overflow: "scroll",
            }}
          >
            {this.state.messages.length != 0 ? (
              this.state.messages.map((message, key) => (
                <div
                  ref={(el) => {
                    this.state.ref = el;
                  }}
                >
                  <Message
                    key={key}
                    sender={currentUser === message.senderId ? "right" : "left"}
                    message={message}
                  />
                </div>
              ))
            ) : (
              <div>You haven't chatted yet!</div>
            )}
          </Box>
          <Box sx={{ maxWidth: "md", mx: "auto", paddingTop: 1 }}>
            <FormControl sx={{ width: "100%" }} variant="filled">
              <OutlinedInput
                placeholder="Message..."
                onChange={this.saveMessage}
                value={this.state.message}
                endAdornment={
                  <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                    <SendIcon
                      aria-label="toggle password visibility"
                      onClick={this.sendMessage}
                      edge="end"
                    ></SendIcon>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </div>
      </div>
    );
  }
}

export default Conversation;
