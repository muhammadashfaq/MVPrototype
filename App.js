import React, { Component } from "react";
import Welcome from "./src/screens/Welcome";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import Amplify from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Welcome />
      </Provider>
    );
  }
}

export default App;
