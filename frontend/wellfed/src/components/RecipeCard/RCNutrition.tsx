import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NutritionProps {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}

const NutritionCard: React.FC<NutritionProps> = ({ calories, protein, fat, carbohydrates }) => {
  return (
    <div className="mx-auto bg-white p-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-700 pb-2">Nutrition Per Serving</h3>
        <div className="grid grid-cols-4 text-center py-2">
          <div className="border-r border-gray-300">
            <span className="text-[16px] text-gray-600">Cal</span><br />
            <span className="text-[16px] font-semibold">{calories}g</span>
          </div>
          <div className="border-r border-gray-300">
            <span className="text-[16px] text-gray-600">Protein</span><br />
            <span className="text-[16px] font-semibold">{protein}g</span>
          </div>
          <div className="border-r border-gray-300">
            <span className="text-[16px] text-gray-600">Fat</span><br />
            <span className="text-[16px] font-semibold">{fat}g</span>
          </div>
          <div>
            <span className="text-[16px] text-gray-600">Carb</span><br />
            <span className="text-[16px] font-semibold">{carbohydrates}g</span>
          </div>
        </div>
      </div>
      <Link href="recipe-card/recipe-steps" passHref>
        <div className="flex justify-center items-center mb-4">
          <button className="bg-gradient-to-r from-[#B64B29] to-[#EC9556] hover:from-[#AD3711] hover:to-[#FFB54D] text-white font-bold py-3 px-10 rounded-full text-[18px] shadow-lg transition duration-300 ease-in-out" style={{ width: '358px' }}>
            Start Cooking
          </button>
        </div>
      </Link>
      <Link href="/" passHref>
        <div className="flex justify-center items-center">
          <button className="relative bg-white hover:bg-[#DADADA] font-bold py-2 px-4 rounded-full border-2 transition duration-300 ease-in-out text-lg shadow-lg" style={{ width: '358px' }}>
            <span className="bg-clip-text text-transparent text-[18px]" style={{ backgroundImage: 'linear-gradient(to right, #B64B29, #EC9556)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              <Image className="inline-block mr-2" src="/calendar-icon.svg" alt="Calendar" width={24} height={24} />
              <span className="ml-2">Add to Calendar</span>
            </span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default NutritionCard;
