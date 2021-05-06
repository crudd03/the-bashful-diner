const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GuestTable extends Model {}

GuestTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    server_requested: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "guesttable",
  }
);

module.exports = GuestTable;
