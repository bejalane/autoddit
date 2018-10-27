import React, { Component } from "react";
import Posts from "./components/posts";
import Postform from "./components/postform";
import SignIn from "./components/signIn";
import PrivateRoute from "./components/privateRoute";
import Modal from "./components/modal";

import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <PrivateRoute path="/add-new-post" component={Postform} />
            <PrivateRoute path="/" component={Posts} />
          </Switch>
          <Modal type={"comment"} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
