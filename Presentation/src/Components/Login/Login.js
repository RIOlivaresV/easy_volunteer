import React, { Component } from "react";
import { TextField, Button, FormControl, Snackbar, Box } from "@mui/material";
import * as consts from "../../util/const";

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      password: "",
      open: false,
      message: "",
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.addState = this.addState.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  addState(e) {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }

  register() {
    this.props.history.push("/Register");
  }

  login() {
    let status;
    fetch(`${consts.svr}` + "/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user_token) => {
        let { token, status, message, userId } = user_token;
        if (status === 404 || status === 401) {
          this.setState({ ...this.state, message: message, open: true });
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("id", userId);
          console.log("Tocken");
          console.log(user_token);
          return this.props.history.push("/Dashboard");
        }
      })
      .catch((error) => {
        console.log("The error is ");
        console.log(error);
        this.setState({
          ...this.state,
          message: "Fetch failed, please check your internet connection",
          open: true,
        });
      });
  }

  onClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="d-flex justify-content-center pt-5wf4">
        <Box fullWidth sx={{ maxWidth: "lg", width: 600, padding: 4 }}>
          <h3>Login</h3>
          <br />
          <FormControl fullWidth variant="filled" sx={{ borderRadius: 20 }}>
            <TextField
              id="email"
              label="Email"
              variant="filled"
              onChange={this.addState}
              sx={{ paddingBottom: 5, borderRadius: "20%" }}
            />
          </FormControl>
          <br />
          <FormControl fullWidth variant="filled">
            <TextField
              id="password"
              label="Password"
              variant="filled"
              type="password"
              onChange={this.addState}
              sx={{ paddingBottom: 5 }}
            />
          </FormControl>
          <br />
          <div className="d-flex pt-5">
            <div className=" w-50">
              <Button
                fullWidth
                variant="contained"
                onClick={this.login}
                sx={{ backgroundColor: "#22b573" }}
              >
                Login
              </Button>
            </div>
            <div className="w-50">
              <Button
                fullWidth
                variant="contained"
                onClick={this.register}
                sx={{ backgroundColor: "#22b573" }}
              >
                SingUp
              </Button>
            </div>
          </div>
          <Snackbar
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.onClose}
            message={this.state.message}
          />
        </Box>
      </div>
    );
  }
}

export default Login;
