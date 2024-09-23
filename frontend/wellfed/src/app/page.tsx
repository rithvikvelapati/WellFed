
import React from "react";
import BottomBar from "@/components/BottomBar/BottomBar";
import Profile from "@/components/Profile/Profile";
import '@fontawesome/fontawesome-free/css/all.min.css';
import TopBar from "@/components/TopBar/TopBar";
import DashboardContent from "../components/DashboardContent";
import '../app/globals.css';
import EditEvent from './components/EditEvent/EditEvent';
import Calendar from './components/EventCalender/Calender';


const Page: React.FC = () => {
  return (
    <div className="p-4">
      {/* This page doesn't do anything for now */}
      <Calendar />
    </div>
  );
}

export default Page;
