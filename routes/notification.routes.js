
module.exports = app => {
    const noti = require('../controller/Notification.controller');

    var router = require("express").Router();

    router.post("/create-notify-me", noti.createNotifyMe);
    router.post("/get-all", noti.getAllNotification);
    router.post("/delete", noti.deleteNoti);
    router.post("/set-push-notification", noti.setPushNotifications);

    app.use('/api/notification', router);
};