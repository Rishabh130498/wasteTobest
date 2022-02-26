const express=require('express');

const router = express.Router();
const UserController = require("../controller/user.controller");
//render home page
router.get('/register',UserController.registerUser);

module.exports=router;