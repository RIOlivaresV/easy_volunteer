import React, { Component } from "react";
import { Snackbar } from "@mui/material";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: true,
    };
    this.onclick = this.onclick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onclick() {
    this.setState({ open: true });
  }

  onClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  render() {
    // this.onclick();
    return (
      <div>
        <h1>Dashboard</h1>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.onClose}
          message="Welcome to Easy volunter"
        />
      </div>
    );
  }
}

export default Dashboard;
