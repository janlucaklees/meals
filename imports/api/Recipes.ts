import { Mongo } from "meteor/mongo";

import { Ingredient } from "./Ingredients";

export type Measurement = {
  ingredient: Ingredient;
  amount: string;
};

export type Recipe = {
  name: string;
  ingredients: Measurement[];
};

export const RecipeCollection = new Mongo.Collection<Recipe>("recipes");
