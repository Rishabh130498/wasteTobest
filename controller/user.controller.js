const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const OP = require('sequelize').Op;
const users = global.db.users;
let jwt = require('jsonwebtoken');
let salt = 'hs09fghMHfas23ghH61g';

const registerUser = async (req, res) => {
    try {
        if (!req.body.firstName && req.body.lastName) {
            return res.status(400).json({
                message: "FirstName and Lastname is requitred"
            });
        }
        if (!req.body.email) {
            return res.status(400).json({
                message: "Email is requitred"
            });
        }
        if (!req.body.cellPhone) {
            return res.status(400).json({
                message: "Phone Number is requitred"
            });
        }
        if (!req.body.address) {
            return res.status(400).json({
                message: "Address is requitred"
            });
        }
        if (!req.body.city) {
            return res.status(400).json({
                message: "City is requitred"
            });
        }
        if (!req.body.state) {
            return res.status(400).json({
                message: "State is requitred"
            });
        }
        if (!req.body.password) {
            return res.status(400).json({
                message: "password is required"
            });
        }
        const userData = await users.findOne({
            where: {
                email: { [OP.iLike]: req.body.email },
            }
        });

        if (userData) {
            return res.status(400).json({
                message: "User already exist"
            });
        } else {
            let BCRYPT_SALT_ROUNDS = 12;
            let hashPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
            const newData = {
                ...req.body,
                password: hashPassword,
                verificationStatus: req.body.verificationStatus ? req.body.verificationStatus : false
            }
            const createUser = await users.create(newData);
            if (createUser) {
                return res.status(200).json({
                    message: "User registered successfully"
                });
            } else {
                return res.status(500).json({
                    message: "something went wrong"
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const loginUser = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({
                message: "Email is requitred"
            });
        }
        if (!req.body.password) {
            return res.status(400).json({
                message: "Password is requitred"
            });
        }

        const userExist = await users.findOne({
            where: {
                email: { [OP.iLike]: req.body.email },
            }
        })

        if (userExist) {
            const password = await bcrypt.compare(req.body.password, userExist.password);
            if (!password) {
                return res.status(400).json({
                    message: "Invalid username/password"
                });
            } else {
                let tokenObj = {
                    id: userExist.id,
                    firstName: userExist.firstName,
                    lastName: userExist.lastName,
                    email: userExist.email,
                    address: userExist.address,
                    city: userExist.city,
                    state: userExist.state,
                    country: userExist.country,
                }
                const token = jwt.sign(
                    tokenObj,
                    salt,
                    {}
                );

                return res.status(200).json({
                    message : "User loggedIn",
                    token : token
                })
            }
        } else {
            return res.status(400).json({
                message: "User not found"
            });
        }
    } catch (err) {
        console.log(err);
    }
}

const getUser = async (req, res) => {
    try {
        console.log(req.query);
        if (!req.query || !req.query.id) {
            return res.status(400).json({
                message: "User id not found"
            });
        } else {
            const user = await users.findOne({
                where :{
                    id : req.query.id
                }
            });
            return res.status(200).json({
                message: "User",
                data : user
            });

        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}