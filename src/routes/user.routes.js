const express = require('express');
const UserRoutes = express.Router();
const { userVerifyToken } = require('../../src/helpers/userverifytoken');

const {
   registerUser,
   loginUser,
   getAllUser,
   getUser,
   updateUser,
   deleteUser
} = require('../controller/user.controller');

UserRoutes.post('/register-user' , registerUser);
UserRoutes.post('/login-user' ,loginUser );
UserRoutes.get('/get-All-user',userVerifyToken, getAllUser);

// GET SPECIFIC ADMIN
UserRoutes.get('/get-Admin',userVerifyToken, getUser);

// UPDATE ADMIN
UserRoutes.put('/update-Admin',userVerifyToken, updateUser);

// DELETE ADMIN
UserRoutes.delete('/delete-Admin',userVerifyToken, deleteUser);

module.exports = UserRoutes;