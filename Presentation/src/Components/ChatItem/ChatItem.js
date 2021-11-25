import { ThemeProvider } from "@emotion/react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React, { Component } from "react";
import * as consts from "../../util/const";

class ChatItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { user: "", friendID: "" };
    this.getUser = this.getUser.bind(this);
    this.goConversation = this.goConversation.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const fID = this.props.conversation.member.find(
      (m) => m !== sessionStorage.getItem("id")
    );
    this.setState({ ...this.state, friendID: fID });
    fetch(`${consts.svr}` + "/profile/" + fID, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        let profile = user.collection;
        console.log("User " + profile);
        this.setState({
          user: profile,
        });
      });
  }

  goConversation() {
    this.props.openConversation(this.props.conversation);
  }

  render() {
    return (
      <div>
        <ListItem alignItems="flex-start" onClick={this.goConversation}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="" />
          </ListItemAvatar>
          <ListItemText
            primary={this.state.user.name + " " + this.state.user.lastName}
          />
        </ListItem>
      </div>
    );
  }
}

export default ChatItem;
