const router = require('express').Router();

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/gas', gasRoutes);
router.use('/car', carRoutes);
router.use('/commute', commuteRoutes);

module.exports = router;