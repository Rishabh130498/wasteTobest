const Sequelize = require('sequelize');
const OP = require('sequelize').Op;
const users = global.db.users;

const registerUser = async (req, res) => {
    try {
        if (!req.body.firstName && req.body.lastName) {
            return res.status(400, {
                message : "FirstName and Lastname is requitred"
            });
        }
        if (!req.body.firstName && req.body.lastName) {
            return res.status(400, {
                message : "FirstName and Lastname is requitred"
            });
        }
        if (!req.body.email) {
            return res.status(400, {
                message : "Email is requitred"
            });
        }
        if (!req.body.email) {
            return res.status(400, {
                message : "Email is requitred"
            });
        }
        if (!req.body.cellPhone) {
            return res.status(400, {
                message : "Phone Number is requitred"
            });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    registerUser
}