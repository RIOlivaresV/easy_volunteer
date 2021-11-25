import React, { Component } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as consts from "../../util/const";
import ChatItem from "../ChatItem/ChatItem";

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { conversations: [] };
    this.getConversation = this.getConversation.bind(this);
    this.openConversation = this.openConversation.bind(this);
  }

  openConversation(conversation) {
    this.props.history.push({
      pathname: "/Conversation",
      state: conversation,
    });
  }

  componentDidMount() {
    this.getConversation();
  }

  getConversation() {
    fetch(`${consts.svr}` + "/conversation/" + sessionStorage.getItem("id"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((conversation) => {
        this.setState({ ...this.setState, conversations: conversation });
        console.log("sttae");
        console.log(this.state.conversations.length);
      });
  }

  render() {
    return (
      <div>
        <h3 className="justify-content-center">Chat</h3>
        <div className=" justify-content-center pt-5wf4">
          <Box fullWidth sx={{ maxWidth: "md", padding: 2, mx: "auto" }}>
            <List
              sx={{
                width: "100%",
                maxWidth: "lg",
                bgcolor: "background.paper",
              }}
            >
              {this.state.conversations.map((conversation) => (
                <ChatItem
                  conversation={conversation}
                  openConversation={this.openConversation}
                />
              ))}
            </List>
          </Box>
        </div>
      </div>
    );
  }
}

export default Chat;
