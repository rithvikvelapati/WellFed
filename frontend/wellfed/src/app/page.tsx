import React from "react";
import BottomBar from "@/components/BottomBar/BottomBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Add some content for the home page */}
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to the Landing Page</h1>
        <p>Tool Bar and the Top Bar will be added</p>
      </main>

      {/* Bottom navigation bar */}
      <BottomBar />
    </div>
  );
}
