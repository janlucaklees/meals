import React from "react";
import { useDrag } from "react-dnd";
import { Recipe } from "/imports/api/Recipes";

type RecipeTileProps = {
  isDragging: boolean;
  recipe: Recipe;
};

export const RecipeTile: React.FC<RecipeTileProps> = ({
  isDragging,
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

  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      className="border border-dashed rounded-lg px-2 py-1 text-center hover:bg-gray-100 transition"
    >
      <span className="text-gray-400 italic">{recipe.name}</span>
    </div>
  );
};
