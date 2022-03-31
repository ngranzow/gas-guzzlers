const router = require('express').Router();

const userRoutes = require('./user-routes');
const gasRoutes = require('./gas-routes');
const carRoutes = require('./car-routes');
const commuteRoutes = require('./commute-routes');

router.use('/users', userRoutes);
router.use('/gas', gasRoutes);
router.use('/car', carRoutes);
router.use('/commute', commuteRoutes);

module.exports = router;