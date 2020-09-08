
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/css/nucleo-icons.css";


ReactDOM.render(
  <BrowserRouter>
    <AdminLayout />
  </BrowserRouter>,

  document.getElementById("root")
);
