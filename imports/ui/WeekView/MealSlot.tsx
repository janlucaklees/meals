import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { Meteor } from "meteor/meteor";
import { format } from "date-fns";
import { Recipe } from "/imports/api/Recipes";
import { ScheduleContext } from "../ScheduleContext";

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
    drop: async (recipe) => {
      Meteor.callAsync(
        "scheduleRecipe",
        format(date, "yyyy-MM-dd"),
        slot,
        recipe,
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  let clazz = "";
  if (isActive) {
    clazz = "bg-gray-200";
  } else if (canDrop) {
    clazz = "bg-gray-100";
  }

  return (
    <div
      ref={drop}
      key={slot}
      className={`border border-dashed rounded-lg px-2 py-1 text-center transition ${clazz}`}
    >
      <span className="text-gray-400 italic">
        {isActive
          ? "Release to drop"
          : currentRecipe
            ? currentRecipe.recipe.name
            : slot}
      </span>
    </div>
  );
};
