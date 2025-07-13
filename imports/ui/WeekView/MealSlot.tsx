import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { Meteor } from "meteor/meteor";
import { format } from "date-fns";
import { Recipe } from "/imports/api/Recipes";
import { ScheduleContext } from "../ScheduleContext";
import { RecipeTile } from "../RecipeFinder/RecipeTile";
import { Button } from "../components/Button";
import { ScheduleCollection } from "/imports/api/Schedules";

type MealSlotProps = {
  date: Date;
  slot: string;
};

export const MealSlot: React.FC<MealSlotProps> = ({ date, slot }) => {
  const schedules = useContext(ScheduleContext);
  const currentRecipe = schedules.find(
    (schedule) =>
      schedule.date === format(date, "yyyy-MM-dd") && schedule.slot === slot,
  );

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "recipe",
    drop: async (recipe: Recipe) => {
      if (currentRecipe) {
        ScheduleCollection.updateAsync(
          { _id: currentRecipe._id },
          { $set: { recipe } },
        );
      } else {
        ScheduleCollection.insertAsync({
          recipe,
          date: format(date, "yyyy-MM-dd"),
          slot,
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  function clearSlot() {
    if (currentRecipe) {
      ScheduleCollection.removeAsync({ _id: currentRecipe._id });
    }
  }

  const isActive = canDrop && isOver;

  let clazz = "";
  if (isActive) {
    clazz = "bg-gray-200";
  } else if (canDrop) {
    clazz = "bg-gray-100";
  }

  return (
    <div ref={drop} key={slot} className="relative h-full">
      {!currentRecipe ? (
        <span className="text-gray-400 italic">
          {isActive ? "Release to drop" : slot}
        </span>
      ) : (
        <>
          <RecipeTile isVariableHeight={true} recipe={currentRecipe.recipe} />
          <div className="absolute top-2 right-2 flex justify-end">
            <Button label="❌" onClick={() => clearSlot()} />
          </div>
        </>
      )}
    </div>
  );
};
