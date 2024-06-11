const UserServieces = require('../services/user.services');
const userService = new UserServieces();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req , res) => {
    try {
        let user = await userService.getUser({email: req.body.email});
        console.log(user);
        if(user){
            return res.status(400).json({Message: `User is Alredy Registerd...`})
        }
        let hashPassword = await bcrypt.hash(req.body.password , 10);
        // console.log(hashPassword);
        user = await userService.addNewUser({
            ...req.body,
            password:hashPassword,
           
        });
        res.status(201).json({user, Message: 'New User is Added...'})
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: `Internal server error.. ${console.error()} `});
    }
};

exports.loginUser = async(req , res) => {
    try {
        let user = await userService.getUser({email: req.body.email , isDelete: false});
        console.log(user);
        if(!user){
            return res.status(404).json({Message: 'Email Not Found'})
        }
        let chaekPassword = await bcrypt.compare(req.body.password , user.password);
        if(!chaekPassword){
            return res.status(400).json({Message: 'Password is not match...'})
        }
        let token = jwt.sign({userId: user._id} , 'User');
        res.status(200).json({token , Message: 'Login Successfully'})

    } catch (error) {
        console.log(error);
        res.status(500).json({Message: `Internal server error.. ${console.error()} `});
    }

};