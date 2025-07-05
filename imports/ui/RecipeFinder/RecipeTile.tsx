import React from "react";
import { useDrag } from "react-dnd";
import { Recipe } from "/imports/api/Recipes";

type RecipeTileProps = {
  isDragging: boolean;
  isVariableHeight: boolean;
  recipe: Recipe;
};

export const RecipeTile: React.FC<RecipeTileProps> = ({
  isDragging,
  isVariableHeight = false,
  recipe,
}) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "recipe",
      item: recipe,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );

  const generateHash = (string) => {
    let hash = 0;
    for (const char of string) {
      hash = (hash << 5) - hash + char.charCodeAt(0);
      hash |= 0; // Constrain to 32bit integer
    }
    return hash;
  };

  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      className={`${isVariableHeight || "aspect-4/3"} w-full h-full relative border border-gray-400 rounded-lg transition overflow-clip cursor-grab transform-gpu hover:scale-101 hover:shadow-md hover:shadow-gray-400`}
    >
      <img
        className="w-full h-full object-cover"
        src={`https://baconmockup.com/400/${300 + (generateHash(recipe.name) % 100)}`}
      />

      <div className="absolute inset-x-0 bottom-0 bg-[rgba(0,0,0,0.5)] py-1.5 px-3 text-xl">
        <span className="text-white font-bold italic">{recipe.name}</span>
      </div>
    </div>
  );
};
