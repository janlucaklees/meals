import { Mongo } from "meteor/mongo";

import { WithId } from "/imports/types/WithId";
import { Ingredient } from "./Ingredients";

export type Measurement = {
  ingredient: Ingredient;
  amount: string;
};

export type Recipe = WithId<{
  name: string;
  ingredients: Measurement[];
}>;

export const RecipeCollection = new Mongo.Collection<Recipe>("recipes");
