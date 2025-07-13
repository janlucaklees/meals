import { Mongo } from "meteor/mongo";
import { WithId } from "/imports/types/WithId";

export type Ingredient = WithId<{
  name: string;
  unit: string;
}>;

export const IngredientCollection = new Mongo.Collection<Ingredient>(
  "ingredients",
);
