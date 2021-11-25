import React, { Component } from "react";
import {
  Button,
  SwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  collapseClasses,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";

class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      logoutDialog: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.logout = this.logout.bind(this);
    this.open = this.open.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleDrawerToggle() {
    if (!this.state.logoutDialog) {
      this.setState({ ...this.state, open: !this.state.open });
    }
  }

  logout() {
    this.props.history.push("/Logout");
  }

  open() {
    this.setState({ ...this.state, logoutDialog: true });
    this.logout();
  }

  cancel() {
    this.setState({ ...this.state, logoutDialog: false });
  }

  render() {
    return (
      <div>
        <Button
          fontSize="large"
          onClick={this.handleDrawerToggle}
          sx={{ float: "left" }}
        >
          <MenuIcon />
        </Button>
        <SwipeableDrawer
          anchor="left"
          open={this.state.open}
          onClose={this.handleDrawerToggle}
          onOpen={this.handleDrawerToggle}
        >
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
            onClick={this.handleDrawerToggle}
            onKeyDown={this.handleDrawerToggle}
          >
            <List>
              <Link className="nav-link" to="/Dashboard">
                <ListItem button key="Dashboard">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </Link>
              <Link className="nav-link" to="/Profile">
                <ListItem button key="Profile">
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
              </Link>
              <Link className="nav-link" to="/Chat">
                <ListItem button key="Chat">
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary="Chat" />
                </ListItem>
              </Link>
              <ListItem
                button
                key="Logout"
                onClick={this.open}
                sx={{ bottom: 16 }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </SwipeableDrawer>
        <Dialog
          open={this.state.logoutDialog}
          keepMounted
          onClose={this.cancel}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Logout?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancel}>Cancel</Button>
            <Button onClick={this.logout}>Logout</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(Menu);
