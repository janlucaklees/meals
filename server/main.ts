import { Meteor } from "meteor/meteor";
import { Recipe, RecipeCollection } from "/imports/api/Recipes";
import { ScheduleCollection } from "/imports/api/Schedules";

Meteor.startup(async () => {
  if ((await RecipeCollection.find().countAsync()) === 0) {
    await RecipeCollection.insertAsync({ name: "test" });
  }

  Meteor.publish("recipes", function () {
    return RecipeCollection.find();
  });

  Meteor.publish("schedules", function () {
    return ScheduleCollection.find();
  });
});

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
