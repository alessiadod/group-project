import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Item from "./Components/Item";
import Landing from "./Components/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />}></Route>
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
        <Route
          path="/my-objects"
          element={
            <div style={{ padding: "2rem" }}>
              <h2>My Objects</h2>
            </div>
          }
        />
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
