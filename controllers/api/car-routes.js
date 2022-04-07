const router = require('express').Router();
const { Car, Gas, Commute, User } = require('../../models');
const withAuth = require('../../utils/auth');

//router GET
router.get('/', (req, res) => {
  Car.findAll({
    include: [
      {
          model: Commute,
          attributes: ['commute_distance', 'created_at']
      },
      {
          model: Gas,
          attributes: ['gas_price', 'created_at']
      },
      {
        model: User,
        attributes: ['username']
      }
  ]
  })
    .then(dbCarData => res.json(dbCarData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//router POST
router.post('/', withAuth, (req, res) => {
  Car.create({
    Make: req.body.Make,
    Model: req.body.Model,
    Year: req.body.Year,
    MPG: req.body.MPG,
    user_id: req.session.user_id
  })
    .then(dbCarData => res.json(dbCarData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

//router DELETE
router.delete('/:id', withAuth, (req, res) => {
  Car.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCarData => {
      if (!dbCarData) {
        res.status(404).json({ message: 'No Car found with this id!' });
        return;
      }
      res.json(dbCarData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
