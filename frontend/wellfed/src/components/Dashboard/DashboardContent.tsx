import SlideShow from "./ui/SlideShow";
import FeaturedMedia from "./ui/FeaturedMedia";
import SuggestedRecipes from "./ui/HorizontalRecipeCards";
import DiscoverEvents from "./ui/DiscoverEvents";

const DashboardContent = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto pt-1 pl-1">
      <div className="mb-2">
        <SlideShow />
      </div>
      <div className="flex justify-between items-center pt-2">
        <h2 className="text-fluid-md font-semibold">Suggest Recipes For You</h2>
        <a className="text-fluid-sm mr-1 text-slate-900 ">See All</a>
      </div>
      <SuggestedRecipes />
      <div className="flex justify-between items-center pt-2">
        <h2 className="text-fluid-md font-semibold">Featured Media</h2>
        <a className="text-fluid-sm mr-1 text-slate-900 ">See All</a>
      </div>
      <div className="flex w-full">
        <FeaturedMedia
          videoUrl={
            "https://player.vimeo.com/video/910498960?autoplay=1&muted=1&loop=1&background=1"
          }
        />
      </div>
      <div className="flex justify-between items-center pt-2">
        <h2 className="text-fluid-md font-semibold">Discover Events</h2>
        <a className="text-fluid-sm mr-1 font-normal text-slate-900 ">
          See All
        </a>
      </div>
      <div className="mb-2">
        <DiscoverEvents />
      </div>
    </div>
  );
};

export default DashboardContent;
