import React, { Component } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/system";

class Message extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const direction =
      this.props.sender == "right"
        ? "justify-content-end"
        : "justify-content-left";
    const color = this.props.sender == "right" ? "#f15a24" : "#22b573";
    const text = this.props.sender == "right" ? "end" : "left";
    const message = this.props.message;
    return (
      <Box
        key={this.props.key}
        className={"d-flex pt-5wf4 " + direction}
        sx={{
          backgroundColor: "white",
          paddingRight: 1,
        }}
      >
        <Box
          sx={{
            maxWidth: "md",
          }}
        >
          <Box
            sx={{
              border: "1px solid " + color,
              backgroundColor: color,
              color: "white",
              borderRadius: 5,
              margin: 1,
              padding: 1,
              textAlign: text,
            }}
          >
            {message.text}
          </Box>
          <Box
            sx={{
              fontSize: 10,
              float: this.props.sender,
              paddingRight: 2,
              paddingLeft: 2,
            }}
          >
            {message.createdAt}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Message;
