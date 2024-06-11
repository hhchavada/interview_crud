const User = require('../model/user.model');

module.exports = class UserServieces {


    async addNewUser(body) {
        try {
            return await User.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };


    async getUser(body){
        try {
            return await User.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async getUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
    async getAllUsers(query) {
        try {
            return await User.find(query);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // UPDATE USER
    async updateUser(id, body) {
        try {
            return await User.findByIdAndUpdate(id, {$set: body}, {new: true});
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}