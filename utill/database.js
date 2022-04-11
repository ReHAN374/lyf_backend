const mysql = require('mysql');

require('dotenv').config();

//const config = require('../config/config.json');

// const dbPool = mysql.createPool({
//     host : config.host,
//     user : config.user,
//     database : config.database,
//     password : config.password,
//     connectionLimit: 10
// });
const dbPool = mysql.createPool({
        // host : process.env.HOST,
        // user : process.env.USER,
        // database : process.env.DATABASE,
        // password : process.env.PASSWORD,
        // online
        host : "localhost",
        user : "root",
        // database : "heroku_76e4853cf6cfcbc",
        database : "web_test",
        password : "", //12345678 ///jWsPmcV2V6QaasBv

        connectionLimit : 100,
        //debug    :  false

});
console.log("env host " + process.env.HOST);
console.log("Database_URL", dbPool.host);
//module.exports = dbPool.promise();
module.exports = dbPool;