const GuestTable = require("./GuestTable");
const Menu_Item = require("./Menu_Item");
const GuestOrder = require("./GuestOrder");
const Staff = require("./Staff");

// GuestTable.belongsToMany(Menu_Item, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: GuestOrder,
//     unique: false,
//     // foreignKey: menu_item_id,
//   },
//   // Define an alias for when data is retrieved
//   // as: "order_item",
// });

// Menu_Item.belongsToMany(GuestTable, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: GuestOrder,
//     unique: false,
//     // foreignKey: table_id,
//   },
//   // Define an alias for when data is retrieved
//   // as: "item_tables",
// });

GuestTable.hasMany(GuestOrder);
GuestOrder.belongsTo(GuestTable);

Menu_Item.hasMany(GuestOrder);
GuestOrder.belongsTo(Menu_Item);

module.exports = { GuestTable, Menu_Item, GuestOrder, Staff };
