const express = require('express');
const router = express.Router();
require('dotenv').config();

// import controller
var LoginCtrl =  require('../controllers/LoginCtrl');
var RegisterCtrl =  require('../controllers/RegisterCtrl');

// Routes
router.post('/register', RegisterCtrl.register);
router.post('/login', LoginCtrl.login);

module.exports = router;