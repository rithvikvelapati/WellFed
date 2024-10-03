import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import MealDetails and ensure SSR is disabled
const MealDetails = dynamic(() => import('@/components/EventCalender/MealDetails'), {
  ssr: false, // Disable server-side rendering for this component
});

const MealDetailsPage: React.FC = () => {
  return <MealDetails />;
};

export default MealDetailsPage;
