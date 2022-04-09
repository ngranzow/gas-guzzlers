const router = require('express').Router();
const { User, Car, Commute, Gas } = require('../models');
const withAuth = require('../utils/auth');

//router GET - all cars of user
router.get('/', withAuth, (req, res) => {
    Car.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'Make',
            'Model',
            'Year',
            'MPG',
            'created_at'
        ],
        include: [
            {
                model: Commute,
                attributes: ['id', 'commute_distance', 'user_id', 'car_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Gas,
                attributes: ['id', 'gas_price', 'user_id', 'car_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCarData => {
        const cars = dbCarData.map(car => car.get({ plain: true }));
        res.render('dashboard', { cars, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//router GET - specific car of user
router.get('/car/:id', withAuth, (req, res) => {
    Car.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'Make',
            'Model',
            'Year',
            'MPG',
            'created_at'
        ],
        include: [
            {
                model: Commute,
                attributes: ['id', 'commute_distance', 'user_id', 'car_id', 'created_at']
            },
            {
                model: Gas,
                attributes: ['id', 'gas_price', 'user_id', 'car_id', 'created_at']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCarData => {
        if (!dbCarData) {
            res.status(404).json({ message: 'No car found with this id' });
            return;
        }

        const car = dbCarData.get({ plain: true });
        const commutes = car.commutes;
        const gas = car.gas;

        res.render('single-car', { commutes, gas, car, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//router GET - all commutes of user
router.get('/commute/', withAuth, (req, res) => {
    Commute.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'commute_distance',
            'user_id',
            'car_id',
            'created_at'
        ],
        include: [
            {
                model: Car,
                attributes: ['id', 'Make', 'Model', 'Year']
            }
        ]
    })
    .then(dbCommuteData => {
        const commutes = dbCommuteData.map(commute => commute.get({ plain: true }));
        const cars = commutes.map(commute => commute.car);
        res.render('commute', { cars, commutes, loggedIn: true });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;