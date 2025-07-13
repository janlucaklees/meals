import { Mongo } from "meteor/mongo";

import { WithId } from "/imports/types/WithId";
import { Recipe } from "./Recipes";

export type Schedule = WithId<{
  recipe: Recipe;
  date: string;
  slot: string;
}>;

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
