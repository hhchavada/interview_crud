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

exports.getAllUser = async (req, res) => {
    try {
        let userList = await userService.getAllUsers({ isuser: true, isDelete: false });
        res.status(200).json(userList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${error.message}` });
    }
};

// GET SPECIFIC user
exports.getUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is sent as a route parameter
        let user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found..." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${error.message}` });
    }
};

// UPDATE user
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is sent as a route parameter
        let user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: `user Not Found...` });
        }
        user = await userService.updateUser(userId, { ...req.body });
        res.status(200).json({ user, message: `user Updated Successfully...` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${error.message}` });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is sent as a route parameter
        let user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found..." });
        }
        user = await userService.updateUser(userId, { isDelete: true });
        res.status(200).json({ user, message: `user Deleted Successfully...` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${error.message}` });
    }
};