const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GuestOrder extends Model {}

GuestOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    table_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "guesttable",
        key: "id",
      },
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "menu_item",
        key: "id",
      },
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "ORDERED",
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "guestorder",
  }
);

module.exports = GuestOrder;
