import SlideShow from "./ui/SlideShow";
import EventsSection from "./ui/EventsSection";
import FeaturedMedia from "./ui/FeaturedMedia";

import SuggestedRecipes from "./ui/SuggestedRecipes";

const DashboardContent = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto -px-6">
      <SlideShow />
      <div className="flex justify-between items-center py-2">
        <h2 className="text-fluid-md font-sans">Discover Events</h2>
          <a className="text-fluid-sm text-orange-500 hover:text-orange-700 transition-colors ease-in-out duration-300">See All</a>
      </div>
      <EventsSection />
      <div className="flex justify-between items-center py-2">
        <h2 className="text-fluid-md font-sans">Featured Media</h2>
          <a className="text-fluid-sm text-orange-500 hover:text-orange-700 transition-colors ease-in-out duration-300">See All</a>
      </div>
      <div className="flex flex-col w-full">
        <FeaturedMedia videoId="910498960"/>
      </div>
      <div className="flex justify-between items-center py-2">
        <h2 className="text-fluid-md font-sans">Suggested Recipes</h2>
          <a className="text-fluid-sm text-orange-500 hover:text-orange-700 transition-colors ease-in-out duration-300">See All</a>
      </div>
      <SuggestedRecipes />
    </div>
  );
};

export default DashboardContent;