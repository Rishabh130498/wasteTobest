const express=require('express');

const router = express.Router();
const UserController = require("../controller/user.controller");
const Authenticate = require("../config/authenticator.js");
//render home page
router.post('/api/v1/register',UserController.registerUser);
router.post('/api/v1/login', UserController.loginUser);
router.get('/api/v1/getUser', Authenticate.authenticateUser, UserController.getUser);

module.exports=router;