/**
 * index route file of desktop platform.
 * @description: exports all routes of desktop platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/desktop/auth',require('./auth'));
router.use(require('./SaqibEstateRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
