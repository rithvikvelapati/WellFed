import React from 'react';

interface FeaturedMediaProps {
  videoUrl: string; // Accept any video URL
}

const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ videoUrl }) => {
  return (
    <div className="container my-1 px-2 w-full">
      <div
        className="overflow-hidden relative w-full rounded-xl"
        style={{ paddingTop: '56.25%', margin: 0, border: 0 }}
      >
        <iframe
          src={videoUrl} // Use the videoUrl prop
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title="Featured Video"
        ></iframe>
      </div>
    </div>
  );
};

export default FeaturedMedia;
