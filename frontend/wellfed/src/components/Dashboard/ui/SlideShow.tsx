"use client";

import React from 'react';
import SlideCard from './SlideCard';
import { slidesData } from '@/constants'; // Import slides data

const SlideShow: React.FC = () => {
  return (
    <div className="container rounded-lg">
      <SlideCard slides={slidesData} />
    </div>
  );
};

export default SlideShow;
