import SlideShow from "./ui/SlideShow";
import FeaturedMedia from "./ui/FeaturedMedia";
import SuggestedRecipes from "./ui/HorizontalRecipeCards";
import DiscoverEvents from "./ui/DiscoverEvents";
import { useEffect, useState } from "react";
import { useUser } from '@clerk/nextjs';
import { BASE_URL, GET_RECEPIES, GET_SAVED_RECEPIES, PUT_FAV_RECEPIES } from "@/constants/api";
import { Recipe } from "@/constants";
import { SavedRecipe } from "../RecipeCard";

const DashboardContent = () => {

  const [recipesData, setRecipesData] = useState([] as Recipe[]);
  const [savedRecipesData, setSavedRecipesData] = useState([] as SavedRecipe[]);

  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      fetchData();
    }
  }, []);


  const handleToggleFavorite = async (recepie: Recipe) => {
    try {
      const recepieUrl = BASE_URL + PUT_FAV_RECEPIES + recepie?._id;
      const body = {      
        recipeId: recepie?._id,
        userId: user?.id
      }
      const response = await fetch(recepieUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (result) {
        fetchData();
       
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const recepieUrl = BASE_URL + GET_RECEPIES;
      const response = await fetch(recepieUrl); // Call your Next.js API route
      const result = await response.json();
      if (result) {
        
    if(result?.length) {
      fetchSavedData(result);
      
    }
        
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSavedData = async (recipesData: Recipe[]) => {
    try {
      const recepieUrl = BASE_URL + GET_SAVED_RECEPIES + user?.id;
      const response = await fetch(recepieUrl); // Call your Next.js API route
      const result = await response.json();
      if (result) {
        recipesData.forEach(recipe => {
          const savedRecipe = result.find((recipeSaved: SavedRecipe) => recipeSaved.recipeId === recipe._id)
          recipe.favorited = savedRecipe ? true : false;
        })
    
    
        setRecipesData([...recipesData])
        setSavedRecipesData(result);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pt-1 pl-1">
      <div className="mb-2">
        <SlideShow />
      </div>
      <div className="flex justify-between items-center pt-2">
        <h2 className="text-fluid-md font-semibold">Suggest Recipes For You</h2>
        {/* <a className="text-fluid-sm mr-1 text-slate-900 ">See All</a> */}
      </div>
      <SuggestedRecipes recipesData={recipesData} savedRecipesData={savedRecipesData} handleToggleFavorite={(dt: Recipe) => handleToggleFavorite(dt)} />
      <div className="flex justify-between items-center pt-2">
        <h2 className="text-fluid-md font-semibold">Featured Media</h2>
        {/* <a className="text-fluid-sm mr-1 text-slate-900 ">See All</a> */}
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
        {/* <a className="text-fluid-sm mr-1 font-normal text-slate-900 ">See All</a> */}
      </div>
      <div className="mb-2">
        <DiscoverEvents />
      </div>
    </div>
  );
};

export default DashboardContent;
