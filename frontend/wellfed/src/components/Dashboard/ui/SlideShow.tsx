import React from 'react';
import SlideCard from './SlideCard';
import { slidesData } from '../../../constants'; // Import slides data

const SlideShow: React.FC = () => {
  return (
    <div className="container mx-auto py-1 px-1">
      <SlideCard slides={slidesData} />
    </div>
  );
};

export default SlideShow;
