import React from 'react';

interface FeaturedMediaProps {
  videoId: string;
}

const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ videoId }) => {
  const vimeoUrl = `https://player.vimeo.com/video/${910498960}?autoplay=1&muted=1&loop=1&background=1`;

  return (
    <div className="container my-1 px-2 w-full rounded-lg bg-black">
      <div className="relative w-full rounded-lg" style={{ paddingTop: '56.25%'}}>
        <iframe
          src={vimeoUrl}
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