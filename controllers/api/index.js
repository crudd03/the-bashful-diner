const router = require('express').Router();
const customerRoutes = require('./tableRoutes');
const serverRoutes = require('./userRoutes');

router.use('/table', customerRoutes);
router.use('/user', serverRoutes);

module.exports = router;