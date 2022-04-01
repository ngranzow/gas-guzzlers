const seedUsers = require('./user-seeds');
const seedCars = require('./car-seeds');
const seedCommutes = require('./commute-seeds');
const seedGas = require('./gas-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
  
    await seedCars();
    console.log('\n----- CARS SEEDED -----\n');
  
    await seedCommutes();
    console.log('\n----- COMMUTES SEEDED -----\n');
  
    await seedGas();
    console.log('\n----- GAS SEEDED -----\n');
  
    process.exit(0);
};
  
seedAll();