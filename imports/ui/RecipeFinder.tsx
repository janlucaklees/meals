import React from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { RecipeCollection } from "/imports/api/Recipes";
import { RecipeTile } from "./RecipeFinder/RecipeTile";
import { Button } from "./components/Button";

type RecipeFinderProps = {};

export const RecipeFinder: React.FC<RecipeFinderProps> = ({}) => {
  const isLoading = useSubscribe("recipes");
  const recipes = useFind(() => RecipeCollection.find());

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-0">
      <div className="bg-gray-200 p-4 border-y border-gray-400 flex justify-between shadow-xl z-10">
        <input
          type="text"
          className="bg-white rounded-lg border p-2 border-gray-400"
          placeholder="Search Recipes"
        />
        <Button label="+ Add Recipe" />
      </div>
      <div className="overflow-y-scroll bg-gray-50">
        <div className="grid grid-cols-7 gap-4 p-4">
          {recipes.map((recipe) => (
            <RecipeTile recipe={recipe} key={recipe.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
