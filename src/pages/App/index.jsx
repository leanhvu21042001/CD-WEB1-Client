import React from "react";
import Registration from "../Registration";
import NavBar from "../../components/NavBar";
import SignIn from "../SignIn";
import { Route, Switch } from "react-router";

export default function App() {
  return (
    <div className="blog-app">
      <NavBar />
      <Switch>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
}
