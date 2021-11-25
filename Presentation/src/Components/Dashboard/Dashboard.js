import React, { Component } from "react";
import {
  Snackbar,
  Box,
  List,
  ListItem,
  Fab,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import NewPost from "../NewPost/NewPost";
import * as consts from "../../util/const";
import Post from "../Post/Post";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: true,
      newPost: false,
      user: Object(),
      posts: [],
      snackbarMessage: "Welcome to Easy volunter",
      deletePost: false,
      postId: "",
    };
    this.onclick = this.onclick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.postCreated = this.postCreated.bind(this);
    this.getPost = this.getPost.bind(this);
    this.openConversation = this.openConversation.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.openDialogDeletePost = this.openDialogDeletePost.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getPost();
    console.log("State " + this.state.users);
  }

  openConversation(userId) {
    fetch(`${consts.svr}` + "/conversation", {
      method: "POST",
      body: JSON.stringify({
        senderId: sessionStorage.getItem("id"),
        recieverId: userId,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((conversation) => {
        this.props.history.push({
          pathname: "/Conversation",
          state: conversation[0],
        });
      });
  }

  getUser() {
    console.log("userId :" + sessionStorage.getItem("id"));
    fetch(`${consts.svr}` + "/profile/" + sessionStorage.getItem("id"), {
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

  getPost() {
    fetch(`${consts.svr}` + "/post/get/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((posts) => {
        let post = posts.query;
        this.setState({
          ...this.state,
          posts: post,
        });
      });
  }

  onclick() {
    this.setState({ ...this.state, open: true });
  }

  onClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ ...this.state, open: false });
  }

  open() {
    console.log(this.state);
    this.setState({ ...this.state, newPost: true });
  }

  close() {
    this.setState({ ...this.state, newPost: false });
  }

  postCreated(posted) {
    this.setState({ ...this.state, posts: [] });
    this.getPost();
    if (posted.post) {
      this.setState({
        ...this.state,
        newPost: false,
        open: true,
        snackbarMessage: "You created a post",
      });
    } else {
      this.setState({
        ...this.state,
        newPost: false,
        open: true,
        snackbarMessage: "Something wrong happened, please try again",
      });
    }
  }

  deletePost() {
    fetch(`${consts.svr}/post/delete/${this.state.postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((posts) => {
      this.setState({ ...this.state, posts: [] });
      this.getPost();
      this.cancelDelete();
    });
  }

  openDialogDeletePost(id) {
    this.setState({ ...this.state, postId: id, deletePost: true });
  }
  cancelDelete() {
    this.setState({ ...this.state, postId: "", deletePost: false });
  }
  render() {
    // this.onclick();
    const fabStyle = {
      position: "fixed",
      bottom: 16,
      right: 16,
      backgroundColor: "#f15a24",
    };

    return (
      <div>
        <h1>Dashboard</h1>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.onClose}
          message={this.state.snackbarMessage}
        />
        <div className="d-flex justify-content-center pt-5wf4">
          <Box fullWidth sx={{ maxWidth: "lg", width: 600, padding: 4 }}>
            <List>
              {this.state.posts.map((post, key) => (
                <ListItem
                  sx={{
                    borderRadius: 1,
                    border: 1,
                    borderColor: "blue",
                    mx: "auto",
                    margin: 2,
                  }}
                >
                  <Post
                    post={post}
                    openConversation={this.openConversation}
                    key={key}
                    deletePost={this.openDialogDeletePost}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>

        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab sx={fabStyle} aria-label="add" onClick={this.open}>
            <AddIcon />
          </Fab>
        </Box>

        <div>
          <Dialog fullWidth onClose={this.close} open={this.state.newPost}>
            <DialogTitle>New Post</DialogTitle>
            <NewPost
              user={this.state.user}
              onClose={this.close}
              postCreated={this.postCreated}
            />
          </Dialog>
          <Dialog
            open={this.state.deletePost}
            keepMounted
            onClose={this.cancelDelete}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Delete Post?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.cancelDelete}>Cancel</Button>
              <Button onClick={this.deletePost}>Logout</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default Dashboard;
