module.exports = app => {
    const TT = require("../controller/Transmission_Type.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

   // router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all", TT.getAllTransmissionTypeInfo);

    app.use('/api/transmision-type', router);
};