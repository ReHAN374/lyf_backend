module.exports = app => {
    const UC = require("../controller/User_Config.controller");

    var router = require("express").Router();

    router.put("/update", UC.update);

    app.use('/api/user-config', router);
};