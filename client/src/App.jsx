import { React, useState } from "react";
import { Outlet } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Item from "./Components/Item";
import LogInPage from "./Components/LogIn";
import RegistrationPage from "./Components/Registration";
import Landing from "./Components/Landing";
// import MyObjects from "./Components/MyObjects";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/items/:id" element={<Item />} />
        {/* Sidebar pages */}
        <Route
          path="/post"
          element={
            <div style={{ padding: "2rem" }}>
              <h2>Post new object</h2>
            </div>
          }
        />
        {/* <Route
          path="/my-objects"
          element={<MyObjects />}
          // element={
          //   <div style={{ padding: "2rem" }}>
          //     <h2>My Objects</h2>
          //   </div>
          // }
        /> */}
        <Route
          path="/requests"
          element={
            <div style={{ padding: "2rem" }}>
              <h2>Requests</h2>
            </div>
          }
        />
        <Route
          path="/borrowed"
          element={
            <div style={{ padding: "2rem" }}>
              <h2>Borrowed Items</h2>
            </div>
          }
        />
        <Route
          path="/signout"
          element={
            <div style={{ padding: "2rem" }}>
              <h2>Signed Out</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
