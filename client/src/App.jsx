import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1> Share & Borrow app</h1>
        <h2> Welcome! </h2>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/items/:id" element={<Item />} />
        {/* Sidebar pages */}
        <Route
          path="/share"
          element={
            <div style={{ padding: "2rem" }}>
              <h2>Share Page</h2>
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
};

export default App;
