import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { RecipeCollection } from "/imports/api/Recipes";
import { ScheduleCollection } from "/imports/api/Schedules";

Meteor.startup(async () => {
  const user = await Accounts.findUserByUsername("dev");

  if (!user) {
    Accounts.createUser({
      username: "dev",
      password: "password",
    });
    console.log("✅ Created test user: dev / devpass");
  } else {
    await Accounts.setPasswordAsync(user._id, "password");
    console.log("✅ Reset dev password");
  }

  if ((await RecipeCollection.find().countAsync()) === 0) {
    const dummyMeals = [
      "Spaghetti Bolognese",
      "Chicken Curry",
      "Beef Stroganoff",
      "Vegetable Stir Fry",
      "Grilled Cheese Sandwich",
      "Tomato Soup",
      "Caesar Salad",
      "Fried Rice",
      "Tuna Pasta Bake",
      "Pancakes",
      "Omelette",
      "Lasagna",
      "Ratatouille",
      "Sushi Rolls",
      "Teriyaki Chicken",
      "Gnocchi with Pesto",
      "Currywurst",
      "Falafel Wrap",
      "Miso Soup",
      "Baked Salmon",
      "Chili con Carne",
      "Quiche Lorraine",
      "Stuffed Bell Peppers",
      "Macaroni and Cheese",
      "Sweet and Sour Chicken",
      "Bibimbap",
      "Lentil Dahl",
      "Pad Thai",
      "Shepherd’s Pie",
      "Greek Gyros",
      "Shrimp Tacos",
      "Butternut Squash Soup",
      "Spinach and Ricotta Cannelloni",
      "Kimchi Fried Rice",
      "Chicken Alfredo",
      "Zucchini Fritters",
      "Pulled Pork Sandwich",
      "Couscous Salad",
      "Shakshuka",
      "Tandoori Chicken",
      "Egg Fried Noodles",
      "Thai Green Curry",
      "Pierogi with Sour Cream",
      "Beetroot and Goat Cheese Salad",
      "Ramen with Soft-Boiled Egg",
      "Tortilla Española",
      "Moroccan Tagine",
      "Bulgur Pilaf",
      "Cauliflower Tikka Masala",
      "Swedish Meatballs",
      "Korean BBQ Beef",
    ];

    for (const name of dummyMeals) {
      await RecipeCollection.insertAsync({ name });
    }
  }

  Meteor.publish("recipes", function () {
    return RecipeCollection.find();
  });

  Meteor.publish("schedules", function () {
    return ScheduleCollection.find();
  });
});
