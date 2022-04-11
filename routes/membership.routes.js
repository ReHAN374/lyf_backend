module.exports = app => {
    const membership = require("../controller/Membership.controller")
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/create", checkAuthMiddleware.checkAuth, membership.create);
    router.post("/get-all", checkAuthMiddleware.checkAuth, membership.getAllMembership);
    router.post("/get-by-id", checkAuthMiddleware.checkAuth, membership.getMembershipById);

    app.use('/api/membership', router);
};