const { Car } = require('../models');

const cardata = [
    {
        Make: 'Honda',
        Model: 'CR-V',
        Year: 2018,
        MPG: 40,
        user_id: 1
    },
    {
        Make: 'Toyota',
        Model: 'Camry',
        Year: 2010,
        MPG: 25,
        user_id: 2
    },
    {
        Make: 'Nissan',
        Model: 'Altima',
        Year: 2004,
        MPG: 20,
        user_id: 3
    },
    {
        Make: 'Subaru',
        Model: 'Forester',
        Year: 2020,
        MPG: 28,
        user_id: 4
    },
    {
        Make: 'Ford',
        Model: 'Explorer',
        Year: 2010,
        MPG: 15,
        user_id: 5
    },
];

const seedCars = () => Car.bulkCreate(commutedata);

module.exports = seedCars;