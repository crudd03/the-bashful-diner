const Table = require("./Table");
const Menu_Item = require("./Menu_Item");
const Order = require("./Order");
const User = require("./User")

Table.belongsToMany(Menu_Item, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Order,
    unique: false,
  },
  // Define an alias for when data is retrieved
   as: 'order_item'
});

Menu_Item.belongsToMany(Table, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Order,
    unique: false,
  },
  // Define an alias for when data is retrieved
   as: 'item_tables'
});




module.exports = { Table, Menu_Item, Order, User };
