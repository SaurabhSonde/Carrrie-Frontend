import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Todo from "./user/Todo";
import CreateTodo from "./user/CreateTodo";
import UpdateTodo from "./user/UpdateTodo";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/todo" exact component={Todo} />
        <PrivateRoute path="/user/create/todo" exact component={CreateTodo} />
        <PrivateRoute
          path="/user/update/todo/:todoId/:userId"
          exact
          component={UpdateTodo}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
