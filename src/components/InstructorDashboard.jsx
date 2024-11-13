import React from 'react';
//import AvailabilityForm from "../instructor/AvailabilityForm";
import InstructorSidebar from "../instructor/InstructorSidebar";
import { Outlet } from 'react-router-dom';

const InstructorDashboard = () => {
  return (
    <div className="instructor-dashboard d-flex">
      <InstructorSidebar />
      <div className="main-content flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default InstructorDashboard;
