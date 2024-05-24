const Helper = require("../../utils/helper");
const UserModel = require("./user.model");
const { default: mongoose } = require("mongoose");



const reportUserRequest = async (req, res) => {
    try {
        const { name, image, address, message } = req.body;
        if (!name || !image || !address || !message) {
            return Helper.fail(res, "all fields are required.");
        }

        const obj = { name, image, address, message }

        const user = await UserModel.create(obj)
        if (user) {
            return Helper.success(res, "user report successfully!", user);
        }
        return Helper.fail(res, "something went wrong!");
    } catch (error) {
        return Helper.fail(res, error.message);
    }
};

const list = async (req, res) => {
    try {
        console.log("Hello from Sandhya");
        const list = await UserModel.find().select({ updatedAt: 0, __v: 0})
        if (!list) {
            return Helper.fail(res, "user request not found")
        }
        return Helper.success(res, "user request found", list)
    }
    catch(error) {
        console.error(error)
    }
}

module.exports = { reportUserRequest, list } 
