const Sequelize = require("sequelize") //for things like Sequelize.STRING
//import your db
const db = require('../db')
//define your model
const Dish = db.define('dish', {
  name: Sequelize.STRING,
  imgUrl: Sequelize.STRING
})

const Ingredient = db.define('ingredient', {
  name: Sequelize.STRING,
})

const RecipeItem = db.define('recipeitem', {})
//define any class or instance methods

//export your model
module.exports = { Dish, Ingredient, RecipeItem}
