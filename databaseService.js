const Sequelize = require('sequelize');
const fs = require("fs");
const path = require('path');
require('dotenv').config();

const pool = {
    min: process.env.SEQ_POOL_MAX || 0, // min 0 number of connection in pool
    max: process.env.SEQ_POOL_MAX || 70, // max 70 number of connection in pool
    idle: process.env.SEQ_POOL_IDLE || 5000, // 5 sec idle before released.
    acquire: process.env.SEQ_POOL_IDLE || 100000, // 100 sec pool will try to get connection before throwing error
};
const createDbConnection = () => {
    const db = {};
    const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS, {
      
            // Explicitly specifying 
            // mysql database
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            // By default host is 'localhost'           
            dialectOptions: {
                ssl: false,
            },
            port: process.env.DB_PORT,
            pool: pool,
            logging: false,
            operatorsAliases: Sequelize.Op,
        }
    );
    
    
    sequelize.authenticate()
      .then(() => {
          console.log("Connection has been established successfully.");
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    
    fs.readdirSync(global.appRoot + '/DB/models')
    .forEach(function (file) {
        var fileName = file.split('.');
        var modelData = fileName[1];
        if (modelData == 'model') {
            const model = require(path.join(global.appRoot + '/DB/models', file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        }
    });
    
    Object.keys(db).forEach(function (modelName) {
        if (db[modelName].options.hasOwnProperty('associate')) {
            db[modelName].options.associate(db)
        }
    });
    
    // assign the sequelize variables to the db object and returning the db.
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    return db;    
}

module.exports = {
    createDbConnection
};