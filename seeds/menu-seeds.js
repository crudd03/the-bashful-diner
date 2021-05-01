const { Menu_item } = require('../models');

const menuData = [
  {
    "dish_name": "French Bread with Brie Cheese",
    "description": "French baguette with warm brie",
    "price": 10,
    "has_nuts": false,
    "prep_time": 600
  },
  {
    "dish_name": "Cheese Plate with Spanish Chorizo",
    "description":
      "Manchego, Iberico, Cabrales, fig jam, grapes, pecans, and Spanich Chorizo",
    "price": 14,
    "has_nuts": true,
    "prep_time": 900
  },
  {
    "dish_name": "Fish Tacos",
    "description":
      "Battered/fried fish, corn tortillas, fresh slaw with jalepenos and cilantro, pickled red onion",
    "price": 13,
    "has_nuts": false,
    "prep_time": 900
  },
  {
    "dish_name": "Tropical Fruit Salad",
    "description": "Guava, papaya, pineapple, mango, and star fruit",
    "price": 10,
    "has_nuts": false,
    "prep_time": 600
  },
  {
    "dish_name": "Pork Gyoza",
    "description":
      "Homemade japanese dumplings stuffed with a pork and green onion filling, served with peanut dipping sauce",
    "price": 14,
    "has_nuts": true,
    "prep_time": 900
  },
  {
    "dish_name": "Yebeg Tibs with Injera Bread",
    "description":
      "Marinated lamb dish with rosemary, garlic, onion, tomato, jalapeño and the East African spice berbere",
    "price": 20,
    "has_nuts": false,
    "prep_time": 1200
  },
  {
    "dish_name": "Cape Malay Curry",
    "description": "Chicken and vegitable curry dish with basmati rice",
    "price": 17,
    "has_nuts": false,
    "prep_time": 1200
  }
];
const seedMenu = () => Menu_item.bulkCreate(menuData);

module.exports = seedMenu;


