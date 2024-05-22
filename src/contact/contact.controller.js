const ContactModel = require('./contact.model');
const Helper = require('../../utils/helper');

const contactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return Helper.fail(res, "all fields are required.");
        }

        const obj = { name, email, phone, message }

        const user = await ContactModel.create(obj)
        if (user) {
            return Helper.success(res, "user message successfully!", user);
        }
        return Helper.fail(res, "something went wrong!");
    } catch (error) {
        return Helper.fail(res, error.message);
    }
};

module.exports = { contactForm }