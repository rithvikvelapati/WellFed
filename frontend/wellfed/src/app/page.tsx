
import React from "react";
import BottomBar from "@/components/BottomBar/BottomBar";
import Profile from "@/components/Profile/Profile";
import '@fontawesome/fontawesome-free/css/all.min.css';
import TopBar from "@/components/TopBar/TopBar";
import DashboardContent from "../components/DashboardContent";
import '../app/globals.css';


const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <TopBar />
      {/* Add some content for the home page */}
      <main className="p-4 mt-16">
        {/* <h1 className="text-2xl font-bold">Welcome to the Landing Page</h1>
        <p>Tool Bar and the Top Bar will be added</p> */}
        <Profile />
      </main>
      {/* Bottom navigation bar */}
      <BottomBar />
    </div>
  );
};

export default Page;
