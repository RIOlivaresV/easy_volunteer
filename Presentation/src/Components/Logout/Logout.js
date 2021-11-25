import React, { Component } from "react";

class Logout extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="max-weight">
        {/* remove items from session storage */}
        <div className=" d-flex justify-content-center align-self-center">
          {sessionStorage.removeItem("token")}
          {sessionStorage.removeItem("id")}
          {sessionStorage.removeItem("email")}
          {this.props.history.push("/")}
        </div>
      </div>
    );
  }
}

export default Logout;
