import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import pages
const LoginLazy = lazy(() => import("../pages/public/login"));

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" Component={LoginLazy} />
      <Route path="/*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}

export default PublicRoutes;
