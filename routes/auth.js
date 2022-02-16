const express = require('express');
const UserController = require('../controllers/users');
const router = express.Router();

router.route('/signup').post(UserController.signUp);
router.route('/login').post(UserController.login);

module.exports = router;