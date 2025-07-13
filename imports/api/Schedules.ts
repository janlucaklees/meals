import { Mongo } from "meteor/mongo";

import { Recipe } from "./Recipes";

export type Schedule = {
  recipe: Recipe;
  date: string;
  slot: string;
};

const ScheduleCollection = new Mongo.Collection<Schedule>("schedules");

ScheduleCollection.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc) {
    return true;
  },
  remove(userId, doc) {
    return true;
  },
});

export { ScheduleCollection };
