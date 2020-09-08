
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Brands from "views/Brands/Brands.js";
import CompanyProfile from "views/CompanyProfile/CompanyProfile.js";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";

const routes = (
  <Switch>
    <Route path="/" exact strict component={Dashboard} />
    <Route path="/dashboard" exact strict component={Dashboard} />
    <Route path="/CompanyProfile" exact strict component={CompanyProfile} />
    <Route path="/Brands" exact strict component={Brands} />
    <Route path="/UserProfile" exact strict component={UserProfile} />
  </Switch>
)
export default routes;

