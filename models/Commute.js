// sequelize Commute model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// extends the sequelize model to the Commute model
class Commute extends Model {}

// build up data structure for Commute data
Commute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    commute_distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
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
    modelName: 'commute'
  }
);

// Export this page
module.exports = Commute;
