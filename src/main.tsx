import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/threads";
import SignIn from "./pages/SignIn";
import Chat from "./pages/chat"; 

import "./style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} /> {/* 👈 new route for chat */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
