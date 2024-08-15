import React, { lazy, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../partials/Header";
import { ASSIGN_DISTRICT, ASSIGN_GP, ASSIGN_TALUK, DASHBOARD, DIS_MASTER, EMP_ASSIGN, EMP_MANAGE, EMP_ROLES, FEEDBACK, GP_MASTER, LOSSTYPE, LOSS_DETAILS, TAL_MASTER, VILLAGE_MASTER } from "../utils/routePaths";
import Sidebar from "../partials/Sidebar";

// Import pages
const DashBoardLazy = lazy(() => import("../pages/Dashboard"));
const LossDataLazy = lazy(() => import("../pages/lossData"));
const LossDetailsLazy = lazy(() => import("../pages/lossDetails"));

const EmpAssignemntLazy = lazy(() => import("../pages/employe/assignment"));
const EmpManagementLazy = lazy(() => import("../pages/employe/management"));
const RoleManagementLazy = lazy(() => import("../pages/employe/roles"));

const AssignDistrictLazy = lazy(() => import("../pages/employe/assignDistricts"));
const AssignTalukLazy = lazy(() => import("../pages/employe/assignTaluk"));
const AssignGpLazy = lazy(() => import("../pages/employe/assignGp"));

const DistrictMastersLazy = lazy(() => import("../pages/masters/district"));
const TalukMastersLazy = lazy(() => import("../pages/masters/taluk"));
const GpMAstersLazy = lazy(() => import("../pages/masters/gramaPanchayat"));
const VillagesMastersLazy = lazy(() => import("../pages/masters/village"));

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
        <Route path={ASSIGN_DISTRICT} Component={AssignDistrictLazy} />
        <Route path={ASSIGN_TALUK} Component={AssignTalukLazy} />
        <Route path={ASSIGN_GP} Component={AssignGpLazy} />
        
        <Route path={EMP_ROLES} Component={RoleManagementLazy} />

        <Route path={DIS_MASTER} Component={DistrictMastersLazy} />
        <Route path={TAL_MASTER} Component={TalukMastersLazy} />
        <Route path={GP_MASTER} Component={GpMAstersLazy} />
        <Route path={VILLAGE_MASTER} Component={VillagesMastersLazy} />

        <Route path="/*" element={<Navigate to={DASHBOARD} />} />
        <Route path="*" element={<div>Page Not Found...............</div>} />
      </Routes>
    </main>
  </div>
  );
}

export default PrivateRoutes;
