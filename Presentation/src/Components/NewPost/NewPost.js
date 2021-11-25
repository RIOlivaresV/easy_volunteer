import React, { Component } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Box, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import * as consts from "../../util/const";

class NewPost extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: "",
      user: this.props.user,
    };
    this.post = this.post.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ ...this.state, message: e.target.value });
    console.log(this.state.message);
  }

  post() {
    console.log(consts.svr + "/post");
    fetch(`${consts.svr}` + "/post", {
      method: "POST",
      body: JSON.stringify({
        id: sessionStorage.getItem("id"),
        message: this.state.message,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.postCreated(data);
      });
  }

  render() {
    const iconStyle = {
      position: "absolute",
      top: 16,
      right: 16,
      cursor: "pointer",
    };

    const textFieldStyle = {
      padding: 1,
    };

    const label =
      this.state.user.name + " " + this.state.user.lastName + " post:";
    // const placeholder =
    //   this.state.profileType == "VOLUNTEER"
    //     ? "How could you help us?"
    //     : "How could we help you?";
    const placeholder =
      this.state.user.profileType == "VOLUNTEER"
        ? "How could you help us?"
        : "How could we help you?";
    return (
      <div style={{ margin: 10 }}>
        <CloseIcon sx={iconStyle} onClick={this.props.onClose} />
        <TextField
          id="standard-multiline-static"
          label={label}
          multiline
          rows={5}
          fullWidth
          placeholder={placeholder}
          onChange={this.onChange}
          variant="standard"
        />
        <Box fullWidth sx={{ borderRadius: 1, border: 1, marginTop: 1 }}>
          <div style={{ margin: 10 }}>
            {" "}
            Add element
            <ImageIcon sx={{ float: "right", cursor: "pointer" }} />
          </div>
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 1, backgroundColor: "#f15a24" }}
          onClick={this.post}
        >
          Post
        </Button>
      </div>
    );
  }
}

export default NewPost;
