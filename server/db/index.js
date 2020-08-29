//import your db
const db = require('./db')
//import your models
const { Dish, Ingredient, RecipeItem} = require('./models/Example')
//state your model associations (hasOne etc)
RecipeItem.belongsTo(Ingredient)
RecipeItem.belongsTo(Dish)
Dish.hasMany(RecipeItem)
Ingredient.hasMany(RecipeItem)
//export your db and Models (so they all can be imported from a single central location)

const syncAndSeed = async()=> {
  await db.sync({ force: true });

  let dishes = [
    {
      name: "Gumbo",
      imgUrl: 'https://imgur.com/ojXC2d9.jpg'
    },
    {
      name: "Étouffée",
      imgUrl: 'https://imgur.com/lQua0t5.jpg'
    },
    {
      name: "Jambalaya",
      imgUrl: 'https://imgur.com/yzhgXbM.jpg'
    }
  ];

  dishes = await Promise.all(dishes.map(dish => Dish.create(dish)));

  let ingredients = [
    {name: 'Onion'},
    {name: 'Garlic'},
    {name: 'Celery'},
    {name: 'Scallion'},
    {name: 'Rice'},
    {name: 'Butter'},
    {name: 'Shrimp'},
    {name: 'Sausage'},
    {name: 'Cayenne'},
    {name: 'Bell Pepper'},
    {name: 'Crawfish'},
    {name: 'Okra'},
    {name: 'Tomato'}
  ]

  ingredients = await Promise.all(ingredients.map(ingredient => Ingredient.create(ingredient)));

  dishes = dishes.reduce( (acc, dish) => {
    acc[dish.name] = dish;
    return acc;
  }, {});

  ingredients = ingredients.reduce( (acc, ingredient) => {
    acc[ingredient.name] = ingredient;
    return acc;
  }, {});

  const recipeitems = await Promise.all([
    RecipeItem.create({ dishId: dishes.Gumbo.id, ingredientId: ingredients.Rice.id}),
    RecipeItem.create({ dishId: dishes.Gumbo.id, ingredientId: ingredients.Shrimp.id}),
    RecipeItem.create({ dishId: dishes.Gumbo.id, ingredientId: ingredients.Okra.id}),
    RecipeItem.create({ dishId: dishes.Gumbo.id, ingredientId: ingredients.Tomato.id}),
    RecipeItem.create({ dishId: dishes.Gumbo.id, ingredientId: ingredients.Cayenne.id}),
    RecipeItem.create({ dishId: dishes.Étouffée.id, ingredientId: ingredients.Onion.id}),
    RecipeItem.create({ dishId: dishes.Étouffée.id, ingredientId: ingredients.Garlic.id}),
    RecipeItem.create({ dishId: dishes.Étouffée.id, ingredientId: ingredients.Celery.id}),
    RecipeItem.create({ dishId: dishes.Étouffée.id, ingredientId: ingredients.Scallion.id}),
    RecipeItem.create({ dishId: dishes.Étouffée.id, ingredientId: ingredients.Rice.id}),
    RecipeItem.create({ dishId: dishes.Étouffée.id, ingredientId: ingredients.Butter.id}),
    RecipeItem.create({ dishId: dishes.Étouffée.id, ingredientId: ingredients.Crawfish.id}),
    RecipeItem.create({ dishId: dishes.Jambalaya.id, ingredientId: ingredients.Sausage.id}),
    RecipeItem.create({ dishId: dishes.Jambalaya.id, ingredientId: ingredients.Shrimp.id}),
    RecipeItem.create({ dishId: dishes.Jambalaya.id, ingredientId: ingredients.Onion.id}),
    RecipeItem.create({ dishId: dishes.Jambalaya.id, ingredientId: ingredients.Rice.id}),
  ]);
  return {
    dishes,
    ingredients,
    recipeitems
  }
};

module.exports = {
  Dish,
  Ingredient,
  RecipeItem,
  syncAndSeed
}
