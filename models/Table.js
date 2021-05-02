const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Table extends Model {}

Table.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'table'
  }
);

module.exports = Table;