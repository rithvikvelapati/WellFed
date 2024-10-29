"use client";

import React, { useEffect } from "react";
import DashboardContent from "@/components/Dashboard/DashboardContent";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isSignedIn } = useUser();
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in')
    }

  }, [isSignedIn])

  return (
    <>
      {
        isSignedIn &&
        <DashboardContent />
      }
    </>
  );
};
