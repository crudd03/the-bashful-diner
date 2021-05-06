const sequelize = require("../config/connection");
const { Staff, Menu_Item, GuestTable, GuestOrder } = require("../models");

const userData = require("./userData.json");
const menuData = require("./menuData.json");
const tableData = require("./tableData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const menu = await Menu_Item.bulkCreate(menuData, {
    individualHooks: true,
    returning: true,
  });

  const users = await Staff.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const tables = await GuestTable.bulkCreate(tableData, {
    individualHooks: true,
    returning: true,
  });
  // Create trips at random
  // for (let i = 0; i < 10; i++) {
  //   // Get a random traveller's `id`
  //   const { id: randomTableId } = tables[
  //     Math.floor(Math.random() * tables.length)
  //   ];

  //   // Get a random location's `id`
  //   const { id: randomMenu_Item_Id } = menu[
  //     Math.floor(Math.random() * menu.length)
  //   ];

  //   // Create a new trip with random `trip_budget` and `traveller_amount` values, but with ids selected above
  //   await GuestOrder.create({
  //     table_id: randomTableId,
  //     menu_item_id: randomMenu_Item_Id,
  //     guesttableId: randomTableId,
  //     note: "Here a note",
  //     status: "ORDERED",
  //   }).catch((err) => {
  //     // If there's an error, such as the same random pairing of `traveller.id` and `location.id` occurring and we get a constraint error, don't quit the Node process
  //     console.log(err);
  //   });
  // }

  process.exit(0);
};

seedDatabase();
