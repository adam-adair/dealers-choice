const router = require("express").Router()
const { Dish, Ingredient, RecipeItem} = require('../db')

//routes go here
router.get('/dishes', async (req, res, next)=> {
  try {
    res.send(await Dish.findAll());
  }
  catch(ex){
    next(ex);
  }
});

router.get('/dishes/:id', async (req, res, next)=> {
  try {
    res.send(await Dish.findAll({
      where: { id: req.params.id },
      include: [{
        model: RecipeItem,
        include: {model: Ingredient}
      }]
    }));
  }
  catch(ex){
    next(ex);
  }
});

module.exports = router
