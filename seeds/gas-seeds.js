const { Gas } = require('../models');

const gasData = [
    {
        gas_price: 3.11,
        user_id: 1,
        car_id: 1
    },

    {
        gas_price: 3.99,
        user_id: 2,
        car_id: 2
    },

    {
        gas_price: 4.88,
        user_id: 3,
        car_id: 3
    },

    {
        gas_price: 5.76,
        user_id: 4,
        car_id: 4
    },
    
    {
        gas_price: 6.06,
        user_id: 5,
        car_id: 5
    },
];

const seedGas = () => Gas.bulkCreate(gasData);

module.exports = seedGas;