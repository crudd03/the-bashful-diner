const router = require('express').Router();
const customerRoutes = require('./customerRoutes');
const serverRoutes = require('./serverRoutes');

router.use('/customer', userRoutes);
router.use('/server', projectRoutes);

module.exports = router;