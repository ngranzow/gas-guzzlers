const { Commute } = require('../models');

const commutedata = [
    {
        commute_distance: 20,
        user_id: 1,
        car_id: 1
    },
    {
        commute_distance: 45,
        user_id: 2,
        car_id: 2
    },{
        commute_distance: 80,
        user_id: 3,
        car_id: 3
    },{
        commute_distance: 90,
        user_id: 4,
        car_id: 4
    },{
        commute_distance: 10,
        user_id: 5,
        car_id: 5
    },
];

const seedCommutes = () => Commute.bulkCreate(commutedata);

module.exports = seedCommutes;