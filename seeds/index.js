const sequelize = require('../config/connection');
const { User, Menu_Item, Table } = require('../models');



const userData = require('./userData.json');
const menuData = require('./menuData.json');
const tableData = require('./tableData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const menu = await Menu_Item.bulkCreate(menuData, {
    individualHooks: true,
    returning: true,
  });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
 
  const tables = await Table.bulkCreate(tableData, {
    individualHooks: true,
    returning: true,
  });
  

  process.exit(0);
};

seedDatabase();