const router = require('express').Router();
const { Car } = require('../../models');

//router GET
router.get('/', (req, res) => {
  Car.findAll()
    .then(dbCarData => res.json(dbCarData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//router POST
router.post('/', (req, res) => {
  Car.create({
    Make: req.session.Make || req.body.Make,
    Model: req.session.Model || req.body.Model,
    Year: req.session.Year || req.body.Year,
    MPG: req.session.MPG || req.body.MPG,
    user_id: req.session.user_id || req.body.user_id
  })
    .then(dbCarData => res.json(dbCarData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

//router DELETE
router.delete('/:id', (req, res) => {
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
