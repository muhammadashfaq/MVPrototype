/* eslint-disable quotes */
import React, { Component } from "react";
import { StatusBar, ActivityIndicator, View } from "react-native";

import { connect } from "react-redux";
import { Auth } from "aws-amplify";

import Tabs from "../navigation/auth/Tabs";
import Nav from "../navigation/nav/Nav";

class Welcome extends Component {
  state = {
    user: {},
    isLoading: true
  };
  async componentDidMount() {
    StatusBar.setHidden(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user });
    } catch (err) {
      this.setState({ user: {} });
    }
  }

  render() {
    if (this.state.isLoading)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color="red" />
        </View>
      );
    let loggedIn = false;
    if (this.state.user.username) {
      loggedIn = true;
    }
    if (loggedIn) {
      return <Nav />;
    }
    return <Tabs />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Welcome);
