const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    table_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'table',
        key: 'id',
      },
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'menu_item',
        key: 'id',
      },
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "ORDERED"
      
    },
    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'order'
  }
);

module.exports = Order;