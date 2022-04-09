// sequelize Gas model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// extends the sequelize model to the Gas model
class Gas extends Model {}

//// build up data structure for Gas data
Gas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gas_price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    car_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'car',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'gas'
  }
);

// Export this page
module.exports = Gas;
