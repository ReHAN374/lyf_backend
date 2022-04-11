const Messages = require('../model/Message');
const User = require('../model/user')

//!Get all chat info by uid
exports.getAllChatinfo = (req, res) => {
    var data = {
        uid: req.body.uid
    };
    Messages.getAllChatInfoByUid(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var fullRes = [];
        for (let i = 0; i < success1.length; i++) {
            var id = success1[i].senderId;
            if (success1[i].senderId == req.body.uid) {
                id = success1[i].receiverId;
            }
            var response1 = await User.getUserInfo(id);
            var data = {
                roomId: success1[i].roomId
            }
            var response2 = await Messages.getLastMsgOfChat(data)
            if (response2.length != 0) {
                fullRes.push({
                    ...success1[i],
                    ...response1[0],
                    lastMsg: response2.length == 0 ? '' : response2[0].message_content,
                    lastMsgTime: response2.length == 0 ? '' : response2[0].create_at
                });
            }
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: fullRes
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}







exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newMessage = {
        "message_content": req.body.message_content,
        "date": createTime,
        "view_status": "2",
        "send_status": "1",
        "idSession": req.body.idSession,
        "senderId": req.body.senderId,
        "receiverId": req.body.receiverId,
        "roomId": req.body.roomId,
        "status": "1",
        "create_at": createTime,
        "update_at": null,
        "remove_at": null
    }

    Messages.create(newMessage, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Message."
            });
        else resp.send(data);
    });
};

//!Create new room
exports.createRoom = (req, res) => {
    var createTime = new Date();

    var newRoom = {
        "senderId": req.body.senderId,
        "receiverId": req.body.receiverId,
        "create_at": createTime
    }
    Messages.createRoom(newRoom, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 400,
                error: err,
                response: null
            })
        } else {
            res.status(200).json({
                status: 200,
                error: null,
                response: {
                    ...newRoom,
                    roomId: data.insertId
                }
            })
        }
    });
};

//!Delete chat room and msgs
exports.deleteCharRoom = (req, res) => {
    var data = {
        roomId: req.body.roomId
    }
    Messages.deleteChatRoom(data).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "Chat rom deleted successfully."
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}


exports.getAllChatRooms = (req, resp) => {
    // if (!req.body) {
    //     resp.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    // }

    // var sessionId = req.body.chatSessionId;

    Messages.getAllChatRooms((err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

exports.getAllMessageByChatSessionId = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var sessionId = req.body.chatSessionId;

    Messages.getAllMessageInfoByChatSessionId(sessionId, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

exports.getAllMessagesByRoomId = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var roomId = req.body.roomId;

    Messages.getAllMessagesByRoomId(roomId, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};