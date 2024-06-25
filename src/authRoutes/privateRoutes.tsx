import React, { lazy, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../partials/Header";
import { DASHBOARD, EMP_ASSIGN, EMP_MANAGE, EMP_ROLES, FEEDBACK, LOSSTYPE, LOSS_DETAILS } from "../utils/routePaths";
import Sidebar from "../partials/Sidebar";

// Import pages
const DashBoardLazy = lazy(() => import("../pages/Dashboard"));
const LossDataLazy = lazy(() => import("../pages/lossData"));
const LossDetailsLazy = lazy(() => import("../pages/lossDetails"));

const EmpAssignemntLazy = lazy(() => import("../pages/employe/assignment"));
const EmpManagementLazy = lazy(() => import("../pages/employe/management"));
const RoleManagementLazy = lazy(() => import("../pages/employe/roles"));

const feedbackLazy = lazy(() => import("../pages/feedback"));

function PrivateRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className='flex'>
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <main className='flex-1'>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Routes>
        <Route path={DASHBOARD} Component={DashBoardLazy} />
        <Route path={LOSSTYPE} Component={LossDataLazy} />
        <Route path={LOSS_DETAILS} Component={LossDetailsLazy} />

        <Route path={FEEDBACK} Component={feedbackLazy} />
        <Route path={EMP_ASSIGN} Component={EmpAssignemntLazy} />
        <Route path={EMP_MANAGE} Component={EmpManagementLazy} />
        
        <Route path={EMP_ROLES} Component={RoleManagementLazy} />

        <Route path="/*" element={<Navigate to={DASHBOARD} />} />
        <Route path="*" element={<div>Page Not Found...............</div>} />
      </Routes>
    </main>
  </div>
  );
}

export default PrivateRoutes;
