const express = require('express');
const UserRoutes = express.Router();

const {
   registerUser,
   loginUser
} = require('../controller/user.controller');

UserRoutes.post('/register-user' , registerUser);
UserRoutes.post('/login-user' ,loginUser );

module.exports = UserRoutes;