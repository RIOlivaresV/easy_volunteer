import React, { Component } from "react";
import { Button, TextField, FormControl, Snackbar, Box } from "@mui/material";
import profileType from "../../enum/profileType";
import * as consts from "../../util/const";

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      lastName: "",
      email: "",
      open: false,
    };
    this.addState = this.addState.bind(this);
    this.getUser = this.getUser.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  addState(e) {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }

  getUser() {
    console.log(consts.svr + "/profile/" + sessionStorage.getItem("id"));
    fetch(`${consts.svr}` + "/profile/" + sessionStorage.getItem("id"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        let profile = user.collection;
        this.setState({
          name: profile.name,
          lastName: profile.lastName,
          email: profile.email,
        });
        console.log(user);
      });
  }

  update() {
    console.log("It is updating");
    console.log(consts.svr + "/profile/" + this.state);
    fetch(`${consts.svr}/edit/`, {
      method: "PUT",
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        lastName: this.state.lastName,
        _id: sessionStorage.getItem("id"),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        this.setState({ ...this.state, open: true });
        this.props.history.push("/Logout");
      });
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center pt-5wf4">
          <Box fullWidth sx={{ maxWidth: "lg", width: 600, padding: 4 }}>
            <h3 className="justify-content-center">Edit profile</h3>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <TextField
                fullWidth
                id="name"
                label="Name"
                variant="filled"
                value={this.state.name}
                onChange={this.addState}
              />
            </FormControl>
            <br />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <TextField
                fullWidth
                id="lastName"
                label="Last name"
                variant="filled"
                value={this.state.lastName}
                onChange={this.addState}
              />
            </FormControl>
            <br />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="filled"
                value={this.state.email}
                onChange={this.addState}
              />
            </FormControl>
            <br />
            <FormControl variant="filled" sx={{ m: 1 }}>
              <div className="d-flex">
                <Button
                  variant="contained"
                  onClick={this.update}
                  sx={{ backgroundColor: "#22b573" }}
                >
                  Update profile
                </Button>
              </div>
            </FormControl>
            <Snackbar
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.onClose}
              message="Please, login again."
            />
          </Box>
        </div>
      </div>
    );
  }
}

export default Profile;
