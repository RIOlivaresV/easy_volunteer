import React, { Component } from "react";
import { Box, Grid, Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

class Post extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      post: this.props.post,
      anchor: null,
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  handleClick(event) {
    console.log("anchor");
    console.log(event.currentTarget);
    this.setState({ ...this.state, anchor: event.currentTarget, open: true });
    console.log("anchor");
    console.log(this.state.anchor);
  }

  open() {
    this.setState({ ...this.state, open: true });
  }

  handleClose() {
    this.setState({ ...this.state, anchor: null, open: false });
  }

  deletePost() {
    this.props.deletePost(this.state.post._id);
    this.handleClose();
  }
  render() {
    const profile =
      this.state.post.profile.length == 0 ? "" : this.state.post.profile[0]._id;
    const iconStyle = {
      position: "absolute",
      top: 16,
      right: 16,
      cursor: "pointer",
      fontSize: 20,
      visibility:
        profile != sessionStorage.getItem("id") ? "hidden" : "visible",
    };
    return (
      <div className="w-100">
        <Box>
          <MoreVertIcon sx={iconStyle} onClick={this.handleClick} />
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={this.state.anchor}
            open={this.state.open}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={(e) => this.deletePost()}>Delete post</MenuItem>
          </Menu>

          <Grid container spacing={2}>
            <Grid item sx={{}}>
              <AccountCircleIcon sx={{ fontSize: 40, paddingRight: 1 }} />
            </Grid>
            <Grid item>
              <Box sx={{}}>
                {this.state.post.profile.length > 0
                  ? this.state.post.profile[0].name +
                    " " +
                    this.state.post.profile[0].lastName
                  : "No name"}
              </Box>
              <Box sx={{ fontSize: 10 }}>
                {new Date(this.state.post.createdDate).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Box>
            </Grid>
          </Grid>
          <Box fullWidth>{this.state.post.message}</Box>
          <Box fullWidth>
            <Button
              sx={{
                backgroundColor: "#22b573",
                color: "#ffffff",
                float: "right",
              }}
              onClick={(e) => this.props.openConversation(profile)}
              disabled={profile != sessionStorage.getItem("id") ? false : true}
            >
              Chat
              {this.state.post.profile.length > 0
                ? " with " + this.state.post.profile[0].name
                : ""}
            </Button>
          </Box>
        </Box>
      </div>
    );
  }
}

export default Post;
