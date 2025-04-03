/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import config from "config";

import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
// import Header from "./components/header";
import Home from "./components/home";
import Login from "./components/pages/login";
import AddDoctor from "./components/imigrations/SuratJaminan/SuratJaminan";

const AppContainer = function (props) {
  return (
    <Router basename="/">
      <>
        <Route render={(props) => <Header {...props} />} />
        <Routes>
          {/* <Route index element={<Login />} /> */}
          <Route path="/" element={<AddDoctor />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/home" component={Home} /> */}
        </Routes>
        <Route render={(props) => <Footer {...props} />} />
      </>
    </Router>
  );
};

export default AppContainer;
