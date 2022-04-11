module.exports = app => {
    const PT = require("../controller/Property_Type.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/create", checkAuthMiddleware.checkAuth, PT.create);
    router.post("/get-all", PT.getAllPropertyType);

    app.use('/api/property-type', router);

};