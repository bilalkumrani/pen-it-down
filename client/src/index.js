import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup" element={<Signin />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
