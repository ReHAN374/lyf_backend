module.exports = app => {
  const user = require("../controller/User.controller");
  const checkAuthMiddleware = require("../middleware/check-auth");

  var router = require("express").Router();

  router.post("/create", user.create);
  router.post("/send-otp", user.sendOTP);
  router.post("/verify-otp", user.verfyOTP);
  router.post("/login", user.login);
  router.post("/logout", user.logout);
  router.post("/google-login", user.loginWithGoogle);
  router.put("/update", checkAuthMiddleware.checkAuth, user.update);
  router.post("/deactivate", checkAuthMiddleware.checkAuth, user.deactivate);
  router.post("/user-info", checkAuthMiddleware.checkAuth, user.getUserInfo);
  router.get("/get-all", checkAuthMiddleware.checkAuth, user.getAllUsers);
  router.post("/reset-password", checkAuthMiddleware.checkAuth, user.resetPassword);
  router.post("/forget-password", user.forgetPassword);
  router.post("/follow", checkAuthMiddleware.checkAuth, user.addFollowState);
  router.post("/update-profile-photo", checkAuthMiddleware.checkAuth, user.updateProfilePhoto);
  router.post("/update-cover-photo", checkAuthMiddleware.checkAuth, user.updateCoverPhoto);
  router.post("/check-follow-state", checkAuthMiddleware.checkAuth, user.checkSelectedAccountFollowOrNot);
  router.post("/check-selected-account-valid", user.checkSelectedAccounttValidOrNot);
  
  app.use('/api/user', router);
};