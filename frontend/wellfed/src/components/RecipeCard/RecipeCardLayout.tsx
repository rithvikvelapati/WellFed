import Header from "./RCHeader";
import Profile from "./RCProfileCard";
import Ingredients from "./RCIngredients";
import Nutrition from "./RCNutrition";
import Timer from "./RCTimers";
import Reviews from "./RCReviews";

const RecipeCardLayout = () => {
  return (
    <div>
      <Header />
      <Profile />
      <Timer />
      <Ingredients />
      <Nutrition />
      <Reviews />
    </div>
  );
};

export default RecipeCardLayout;
