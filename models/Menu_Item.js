const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Menu_Item extends Model {}

Menu_Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dish_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        isDecimal: true,  
      },
    },
    has_nuts: {
      type: DataTypes.BOOLEAN,
    },
    appetizer: {
      type: DataTypes.BOOLEAN,
    },
    soup_salad: {
      type: DataTypes.BOOLEAN,
    },
    main: {
      type: DataTypes.BOOLEAN,
    },
    dessert: {
      type: DataTypes.BOOLEAN,
    },
    prep_time: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'menu_item'
  }
);

module.exports = Menu_Item;