const GuestTable = require("./Table");
const Menu_Item = require("./Menu_Item");
const GuestOrder = require("./Order");
const Staff = require("./User")

GuestTable.belongsToMany(Menu_Item, {
  // Define the third table needed to store the foreign keys
  through: {
    model: GuestOrder,
    unique: false,
  },
  // Define an alias for when data is retrieved
   as: 'order_item'
});

Menu_Item.belongsToMany(GuestTable, {
  // Define the third table needed to store the foreign keys
  through: {
    model: GuestOrder,
    unique: false,
  },
  // Define an alias for when data is retrieved
   as: 'item_tables'
});




module.exports = { GuestTable, Menu_Item, GuestOrder, Staff };
