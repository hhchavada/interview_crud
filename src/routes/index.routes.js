const userRoutes = require('express').Router();

const UserRoutes = require('./user.routes');

userRoutes.use('/users' , UserRoutes);

module.exports = userRoutes;
