import * as React from "react";
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import NewEmail from "./Component/Dashboard/NewEmail";
import EmailWizard from "./Component/Dashboard/EmailWizard";
import Login from "./Component/Header/Login";
import Register from "./Component/Header/Register";
import { auth } from "./Config/fire";
import { onAuthStateChanged } from "firebase/auth";

class RouteMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
      <Routes>
         {(() => {
          if (this.state.user) {
            return (
              <>
                <Route path="/" exact element={<App />} />
                <Route path="/dash" exact element={<NewEmail />} />
                <Route path="/new" exact element={<EmailWizard />} />
              </>
            )
          } else {
            return (
              <>
                <Route path="/" exact element={<App />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<Register />} />
              </>
            );
          }
        })()}
      </Routes>
    );
  }
}

export default RouteMain;
