const express = require('express');
const router = express.Router();

// create user authentication for registering as a first time user or login as a returning user
const { register, login } = require('../controllers/auth');

// embed all auth request into router 
router.post('/register' , register);
router.post('/login' , login);

// export router
module.exports = router;