import React, { Component } from "react";
import {
  MenuItem,
  Select,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import profileType from "../../enum/profileType";
import * as consts from "../../util/const";

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      lastName: "",
      profileType: "",
      email: "",
      password: "",
      passwordConfirm: "",
      helperText: "",
    };
    this.addState = this.addState.bind(this);
    this.addType = this.addType.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.register = this.register.bind(this);
  }

  addState(e) {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }

  addType(e) {
    this.setState({ ...this.state, profileType: e.target.value });
  }

  validatePassword(e) {
    if (this.state.password == e.target.value) {
      this.setState({ ...this.state, helperText: "Password match!" });
    } else {
      this.setState({ ...this.state, helperText: "Password does not match." });
    }
  }

  register() {
    console.log(consts.svr + "/register");
    fetch(`${consts.svr}` + "/register", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        lastName: this.state.lastName,
        profileType: this.state.profileType,
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
        return this.props.history.push("/Login");
      });
  }

  render() {
    const x = profileType;
    return (
      <div>
        <div className="d-flex justify-content-center pt-5wf4">
          <Box fullWidth sx={{ maxWidth: "lg", width: 600, padding: 4 }}>
            <h3 className="justify-content-center">Register</h3>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <TextField
                fullWidth
                id="name"
                label="Name"
                variant="filled"
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
                onChange={this.addState}
              />
            </FormControl>
            <br />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="profileTypeLabel">Type</InputLabel>
              <Select
                labelId="profileTypeLabel"
                id="profileType"
                fullWidth
                label="Type"
                variant="filled"
                onChange={this.addType}
              >
                <br />
                <MenuItem value={profileType.Benefited} name="profileType">
                  {profileType.Benefited}
                </MenuItem>
                <MenuItem value={profileType.Volunteer} name="profileType">
                  {profileType.Volunteer}
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="filled"
                onChange={this.addState}
              />
            </FormControl>
            <br />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                variant="filled"
                onChange={this.addState}
              />
            </FormControl>
            <br />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="filled"
                helperText={
                  this.state.helperText != "" ? this.state.helperText : ""
                }
                onChange={this.validatePassword}
              />
            </FormControl>
            <br />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <Button variant="contained" onClick={this.register}>
                Register
              </Button>
            </FormControl>
          </Box>
        </div>
      </div>
    );
  }
}

export default Register;
