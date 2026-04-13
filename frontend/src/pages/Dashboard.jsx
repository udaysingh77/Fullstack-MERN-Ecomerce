import SideBar from "@/components/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="w-full md:ml-80 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
