import React from 'react';
import SlideCard from './SlideCard';

const SlideShow: React.FC = () => {
  const slides = [
    {
      imageUrl: '/slide1.jpg',
      title: 'Delicious Salad',
      description: 'A healthy green salad to keep you energized throughout the day.',
    },
    {
      imageUrl: '/slide2.jpg',
      title: 'Spicy Noodles',
      description: 'Savor the taste of these spicy noodles, cooked with fresh ingredients.',
    },
    {
      imageUrl: '/slide3.jpg',
      title: 'Refreshing Smoothie',
      description: 'Cool off with a refreshing smoothie made from fresh fruits.',
    },
  ];

  return (
    <div className="container mx-auto py-1 px-1">
      <SlideCard slides={slides} />
    </div>
  );
};

export default SlideShow;
