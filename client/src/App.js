import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import Welcome from "./components/Welcome";
import Edit from "./components/Edit";
import UserAuth from "./components/users/UserAuth";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import "./components/invoice.css";
import UserRegister from "./components/users/UserRegister";
function App() {
  return (
    <Router>
      <AppNavBar />
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route
          path="/register"
          exact
          render={props => <UserRegister opened={true} />}
        />
        <Route path="/cart" exact component={Cart} />
        <Route path="/checkout" component={CheckOut} />
        <Route path="/signin" component={UserAuth} />
        <Route path="/:id" exact render={props => <Edit {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
