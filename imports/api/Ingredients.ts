import { Mongo } from "meteor/mongo";

export type Ingredient = {
  name: string;
  unit: string;
};

export const IngredientCollection = new Mongo.Collection<Ingredient>(
  "ingredients",
);
