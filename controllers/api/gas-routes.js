const router = require('express').Router();
const { Gas } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Gas.findAll()
    .then(dbGasData => res.json(dbGasData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {

  Gas.create({
    gas_price: req.body.gas_price,
    user_id: req.session.user_id,
    car_id: req.body.car_id
  })
    .then(dbGasData => res.json(dbGasData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Gas.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbGasData => {
      if (!dbGasData) {
        res.status(404).json({ message: 'No Gas found with this id!' });
        return;
      }
      res.json(dbGasData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
