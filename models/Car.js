// sequelize Post model
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// extends the sequelize model to the Post model
class Car extends Model {}

// build up data structure for post data
Car.init(
  {
    // set id rule
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Make: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    Model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MPG: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //set user id rule
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "car",
  }
);

// Export this page
module.exports = Car;
