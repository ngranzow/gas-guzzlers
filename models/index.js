// import all models
const Car = require('./Car');
const User = require('./User');
const Gas = require('./Gas');
const Commute = require('./Commute');

// create associations
User.hasMany(Car, {
  foreignKey: 'user_id'
});

Car.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.hasMany(Gas, {
  foreignKey: 'user_id'
});

Car.hasMany(Gas, {
  foreignKey: 'car_id'
});

Gas.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Gas.belongsTo(Car, {
  foreignKey: 'car_id',
  onDelete: 'SET NULL'
});

Commute.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Commute.belongsTo(Car, {
  foreignKey: 'car_id',
  onDelete: 'SET NULL'
});

User.hasMany(Commute, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Car.hasMany(Commute, {
  foreignKey: 'car_id'
});

module.exports = { User, Car, Gas, Commute };
