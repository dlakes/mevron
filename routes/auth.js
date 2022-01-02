const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../config/passport')
require('dotenv').config();

// import controller
var AccountCtrl =  require('../controllers/UserCtrl');

//middleware
var jwtMiddleWare = passport.authenticate('jwt', {session: false});

//User routes
router.get('/profile',[jwtMiddleWare], AccountCtrl.getProfile);
router.post('/fare-estimation',[jwtMiddleWare], AccountCtrl.fareEstimation);
router.post('/available-drivers',[jwtMiddleWare], AccountCtrl.availableDriver);
router.post('/request-ride',[jwtMiddleWare], AccountCtrl.requestRide);
router.post('/cancel-ride',[jwtMiddleWare], AccountCtrl.cancelRide);


//Driver routes
router.post('/accept-ride',[jwtMiddleWare], AccountCtrl.acceptRide);

module.exports = router;