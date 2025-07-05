import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

import { Recipe } from "./Recipes";

export type Schedule = {
  recipe: Recipe;
  date: string;
  slot: string;
};

export const ScheduleCollection = new Mongo.Collection<Recipe>("schedules");

if (Meteor.isServer) {
  Meteor.methods({
    async scheduleRecipe(date: string, slot: string, recipe: Recipe) {
      await ScheduleCollection.upsertAsync(
        { date, slot },
        {
          $set: { recipe },
        },
      );
    },
  });
}
