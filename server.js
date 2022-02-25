const express=require('express');

//use cookie parser for set cookie
const path=require('path');
const app=express();
const port=8000;
require('dotenv').config();
const sequelize = require("./databaseService");

const bodyparser=require('body-parser');
global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded());

//set locals
app.use(function(req, res, next) {
    res.locals.admin = req.session.user;
    console.log(res.locals.admin);
    next();
  });

// app.use('/',require('./routes'));
sequelize.createDbConnection();
app.listen(port,function(err){
    if(err){
        console.log("error in running the server on port");
    }

    console.log("Server successfully running on port",port);
})