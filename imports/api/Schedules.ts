import { Mongo } from "meteor/mongo";

import { Recipe } from "./Recipes";

export type Schedule = {
  recipe: Recipe;
  date: string;
  slot: string;
};

export const ScheduleCollection = new Mongo.Collection<Recipe>("schedules");
