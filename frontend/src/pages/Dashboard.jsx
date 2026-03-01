import SideBar from "@/components/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <div>
        <Outlet className="flex-1" />
      </div>
    </div>
  );
};

export default Dashboard;
