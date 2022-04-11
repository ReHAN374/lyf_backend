module.exports = app => {
    const VM = require("../controller/Vehical_Model.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

   // router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all", VM.getAllVehicalModel);

    app.use('/api/vehical-model', router);
};