import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaLocationDot } from "react-icons/fa6";
import RecipeCard, { SavedRecipe } from '../RecipeCard';
import { Recipe, recipesData } from '@/constants';
import { BASE_URL, GET_RECEPIES, GET_SAVED_RECEPIES, PUT_FAV_RECEPIES } from '@/constants/api';
import { useUser } from '@clerk/nextjs';

// VerticalScrollContainer Component
const VerticalScrollContainer: React.FC<{ children: React.ReactNode, height: string }> = ({ children, height }) => {
    return (
        <div className="overflow-y-auto" style={{ maxHeight: height }}>
            {children}
        </div>
    );
};

// PhotoCard Component
const PhotoCard: React.FC<{ imageSrc: string; daysAgo: string; id: number }> = ({ imageSrc, daysAgo, id }) => {
    const [isFavorited, setIsFavorited] = useState(true);
    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <div className="relative w-[163px] h-[222px] rounded-lg overflow-hidden shadow-md">
            <Image
                src={imageSrc}
                alt={`Photo ${id}`}
                width={163}
                height={222}
                className="object-cover"
            />
            {/* Heart Icon */}
            <div
                className="absolute bottom-2 left-2 cursor-pointer"
                onClick={toggleFavorite}
            >
                {isFavorited ? (
                    <FaHeart className="text-red-500 text-xl" />
                ) : (
                    <FaRegHeart className="text-white text-xl" />
                )}
            </div>
            {/* Days Ago */}
            <div className="absolute bottom-2 right-2 text-white text-sm">
                {daysAgo}
            </div>
        </div>
    );
};

// ProfilePreview Component
const ProfilePreview: React.FC = () => {
    const [recipesData, setRecipesData] = useState([] as Recipe[]);
    const { isSignedIn, user } = useUser();

    useEffect(() => {
        if (isSignedIn && user) {
          fetchData();
        }
      }, [isSignedIn, user]);

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

    const recepieData: Recipe[] = recipesData.map(recepie => {
        recepie.favorited = true
        return recepie;
    });
    const [activeTab, setActiveTab] = useState('Photos');
    const [recipes, setRecipes] = useState(recepieData);
    // Sample data for photos
    const photosData = [
        { id: 1, imageSrc: "/beverages.png", daysAgo: "2 days ago" },
        { id: 2, imageSrc: "/desserts.png", daysAgo: "5 days ago" },
        { id: 3, imageSrc: "/beverages.png", daysAgo: "3 months ago" },
        { id: 4, imageSrc: "/desserts.png", daysAgo: "4 months ago" },
        { id: 5, imageSrc: "/beverages.png", daysAgo: "5 months ago" },
        { id: 6, imageSrc: "/desserts.png", daysAgo: "6 months ago" },
    ];

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
            const filteredData = recipesData.filter(recipe => {
              const savedRecipe = result.find((recipeSaved: SavedRecipe) => recipeSaved.recipeId === recipe._id)
              recipe.favorited = savedRecipe ? true : false;
              return savedRecipe ? true : false;
            })
        
        
            setRecipesData([...filteredData])
          } 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    

    // Count of recipes, photos, and collections
    const recipeCount = recipes.length;
    const photoCount = photosData.length;
    const collectionCount = 0; // No collections

    const toggleFavorite = (id: number) => {
        setRecipes(
            recipes.map((recipe) =>
                recipe.id === id ? { ...recipe, favorited: !recipe.favorited } : recipe
            )
        );
    };

    const toggleBookmark = (id: number) => {
        setRecipes(
            recipes.map((recipe) =>
                recipe.id === id ? { ...recipe, bookmarked: !recipe.bookmarked } : recipe
            )
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Profile Section */}
            <div className="flex-shrink-0">
                <div className="relative w-full h-40 bg-gradient-to-r from-[#B64B29] to-[#EC9556] flex flex-col items-center justify-center">
                    {/* Profile Picture */}
                    <div className="relative w-24 h-24 mb-3 -mt-10">
                        <Image
                            src="/Amanda.svg"  // Replace with the actual image path
                            alt="Profile Picture"
                            width={96}
                            height={96}
                            className="rounded-full object-cover border-4 border-white shadow-md"
                        />
                    </div>

                    {/* Profile Info */}
                    <div className="text-center">
                        <p className="text-white text-xl font-bold">Amanda Lockwood</p>

                        {/* Location Icon and Text */}
                        <div className="text-white text-sm mb-1 flex items-center justify-center">
                            <FaLocationDot className="mr-1" />  {/* Location Icon */}
                            <p>London, United Kingdom</p>
                        </div>

                        {/* Followers Count */}
                        <p className="text-white text-sm">
                            <strong className="mr-1">837</strong> Followers
                        </p>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="w-full mt-4 px-2">
                    <div className="flex justify-center rounded-full border border-gray-300 overflow-hidden">
                        {/* Recipes Tab */}
                        <button
                            className={`py-2 px-6 font-semibold flex-1 transition-all ${activeTab === 'Recipes'
                                ? 'bg-gradient-to-r from-[#B64B29] to-[#EC9556] text-white rounded-l-full'
                                : 'bg-white text-black'
                                }`}
                            onClick={() => setActiveTab('Recipes')}
                        >
                            Recipes
                        </button>
                        {/* Photos Tab */}
                        <button
                            className={`py-2 px-6 font-semibold flex-1 transition-all ${activeTab === 'Photos'
                                ? 'bg-gradient-to-r from-[#B64B29] to-[#EC9556] text-white'
                                : 'bg-white text-black'
                                }`}
                            onClick={() => setActiveTab('Photos')}
                        >
                            Photos
                        </button>
                        {/* Collections Tab */}
                        <button
                            className={`py-2 px-6 font-semibold flex-1 transition-all ${activeTab === 'Collections'
                                ? 'bg-gradient-to-r from-[#B64B29] to-[#EC9556] text-white rounded-r-full'
                                : 'bg-white text-black'
                                }`}
                            onClick={() => setActiveTab('Collections')}
                        >
                            Collections
                        </button>
                    </div>
                </div>
            </div>

            {/* Count Display */}
            <div className="px-4 py-2 mt-2 text-gray-600 font-semibold">
                {activeTab === 'Recipes' && <p>{recipesData?.length} recipes</p>}
                {activeTab === 'Photos' && <p>{photoCount} photos</p>}
                {activeTab === 'Collections' && <p>{collectionCount} collections</p>}
            </div>

            {/* Scrollable Content */}
            <VerticalScrollContainer height="calc(100vh - 25rem)">
                {activeTab === 'Recipes' && (
                    <div className='flex flex-wrap place-content-around px-2 py-4'>
                        {recipesData.map((recipe) => (
                            <div key={recipe.id} className='mb-6'>
                            <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onToggleFavorite={(dt: Recipe) => handleToggleFavorite(dt)}
                                    onToggleBookmark={toggleBookmark} savedRecipesData={[]}                            />
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'Photos' && (
                    <div  className='flex flex-wrap place-content-around px-2 py-4'>
                        {/* Example Photo Cards */}
                        {photosData.map((photo) => (
                               <div key={photo.id} className='mb-6'>
                            <PhotoCard
                                key={photo.id}
                                imageSrc={photo.imageSrc}
                                daysAgo={photo.daysAgo}
                                id={photo.id}
                            />
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'Collections' && (
                    <div className="p-4 text-gray-500">
                        No collections to display.
                    </div>
                )}
            </VerticalScrollContainer>
        </div>
    );
};

export default ProfilePreview;
