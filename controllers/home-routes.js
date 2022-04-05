const router = require('express').Router();
const { User, Car, Commute, Gas } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Car.findAll({
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
        res.render('homepage', { 
            cars,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login');
});

router.get('/post/:id', (req, res) => {
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
        if (!dbCarData) {
            res.status(404).json({ message: 'No cars found with this id' });
            return;
        }

        const car = dbCarData.get({ plain: true });

        res.render('single-car', { 
            car,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;