const { Table } = require('../models');

const tableData = [
  {
    table_number: 1,
  },
  {
    table_number: 2,
  },
  {
    table_number: 3,
  },
  {
    table_number: 4,
  },
  {
    table_number: 5,
  },
];

const seedTables = () => Table.bulkCreate(tableData);

module.exports = seedTables;
