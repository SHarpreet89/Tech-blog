const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/').default;
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
