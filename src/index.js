import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Content from "./pages/Content";
import Register from "./pages/Register";
import ScheduleForm from "./pages/ScheduleForm";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><ScheduleForm /></ProtectedRoute>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);