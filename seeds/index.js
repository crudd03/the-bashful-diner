const sequelize = require('../config/connection');
const seedMenu = require('./menu-seeds');
const seedTables = require('./table-seeds');
const seedUsers = require('./user-seeds')





const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedMenu();
  console.log('\n----- MENU_ITEMS SEEDED -----\n');

  await seedTables();
  console.log('\n----- TABLES SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');



  process.exit(0);
};

seedAll();