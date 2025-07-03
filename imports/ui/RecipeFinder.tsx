import React from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { RecipeCollection } from "/imports/api/Recipes";
import { RecipeTile } from "./RecipeFinder/RecipeTile";

type RecipeFinderProps = {};

export const RecipeFinder: React.FC<RecipeFinderProps> = ({}) => {
  const isLoading = useSubscribe("recipes");
  const recipes = useFind(() => RecipeCollection.find());

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-3/5 bg-gray-100">
      <div className="grid grid-cols-8">
        {recipes.map((recipe) => (
          <RecipeTile recipe={recipe} key={recipe.name} />
        ))}
      </div>
    </div>
  );
};
