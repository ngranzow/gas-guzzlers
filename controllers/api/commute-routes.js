const router = require('express').Router();
const { Commute } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Commute.findAll()
    .then(dbCommuteData => res.json(dbCommuteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Commute.create({
    commute_distance: req.body.commute_distance,
    user_id: req.session.user_id,
    car_id: req.body.car_id
  })
    .then(dbCommuteData => res.json(dbCommuteData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});


module.exports = router;
