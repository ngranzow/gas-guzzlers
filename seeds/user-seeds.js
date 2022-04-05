const { User } = require('../models/');

const userData = [
    {
        username: 'bob',
        email: 'bob@bob.com',
        password: process.env.UP1
    },
    {
        username: 'steve',
        email: 'steve@steve.com',
        password: process.env.UP2
    },
    {
        username: 'sarah',
        email: 'sarah@sarah.com',
        password: process.env.UP3
    },
    {
        username: 'dave',
        email: 'dave@dave.com',
        password: process.env.UP4
    },
    {
        username: 'leslie',
        email: 'leslie@leslie.com',
        password: process.env.UP5
    }
];
  
  const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});
  
  module.exports = seedUsers;