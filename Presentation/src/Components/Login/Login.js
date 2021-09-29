import React, { Component } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import * as consts from "../../util/const";

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      password: "",
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.addState = this.addState.bind(this);
  }

  addState(e) {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }

  register() {
    this.props.history.push("/Register");
  }

  login() {
    console.log(consts.svr + "/login");
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
        let { token } = user_token;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("email", this.state.email);
        console.log(sessionStorage);
        return this.props.history.push("/Dashboard");
      });
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="w-50 h-50 align-self-center pt-5">
          <h3 className="justify-content-center">Login</h3>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 500 }}>
            <TextField
              id="email"
              label="Email"
              variant="filled"
              onChange={this.addState}
            />
          </FormControl>
          <br />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 500 }}>
            <TextField
              id="password"
              label="Password"
              variant="filled"
              type="password"
              onChange={this.addState}
            />
          </FormControl>
          <div className="d-flex">
            <div className=" w-50">
              <Button variant="contained" onClick={this.login}>
                Login
              </Button>
            </div>
            <div className="w-50">
              <Button variant="contained" onClick={this.register}>
                SingUp
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
