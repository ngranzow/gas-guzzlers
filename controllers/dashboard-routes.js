const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Car, Commute, Gas } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/edit/:id', withAuth, (req, res) => {
    Car.findOne({
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
        if (dbCarData) {
            const car = dbCarData.get({ plain: true });
          
            res.render('edit-car', {
                car,
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;