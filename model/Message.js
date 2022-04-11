const sql = require('../utill/database');

const Messages = function (newMessage) {
    this.message_content = newMessage.message_content;
    this.date = newMessage.date;
    this.view_status = newMessage.view_status;
    this.send_status = newMessage.send_status;
    this.idSession = newMessage.idSession;
    this.senderId = newMessage.senderId;
    this.status = newMessage.status;
    this.create_at = newMessage.create_at;
    this.update_at = newMessage.update_at;
    this.remove_at = newMessage.remove_at;
    this.receiver_id = newMessage.receiverId;
    this.room_id = newMessage.roomId;
};

//!Get all chat info by uid
Messages.getAllChatInfoByUid = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM chat_rooms AS r 
          WHERE r.senderId=? OR r.receiverId=?`,
            [data.uid, data.uid],
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    })
}

//!Get last msg of chat
Messages.getLastMsgOfChat = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Message AS m
          WHERE m.room_id=? ORDER BY m.create_at DESC LIMIT 1`,
            [data.roomId],
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    })
}

//!//!Delete chat room and msgs
Messages.deleteChatRoom = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`DELETE FROM chat_rooms WHERE roomId=?`,
            [data.roomId],
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    })
}






Messages.create = (newMessage, result) => {
    sql.query("INSERT INTO `Message` (`message_content`, `date`, `view_status`, `send_status`, `idSession`, `senderId`, `status`, `create_at`, `update_at`, `remove_at`, `receiver_id`, `room_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [newMessage.message_content, newMessage.date, newMessage.view_status, newMessage.send_status, newMessage.idSession, newMessage.senderId, newMessage.status, newMessage.create_at, newMessage.update_at, newMessage.remove_at, newMessage.receiverId, newMessage.roomId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created new message: ", { id: res.insertId, ...newMessage });
        result(null, { id: res.insertId, ...newMessage });
    });
};

//!Create room 
Messages.createRoom = (newRoom, result) => {
    sql.query("INSERT INTO `chat_rooms` (`senderId`, `receiverId`, `create_at`) VALUES (?, ?, ?);", [newRoom.senderId, newRoom.receiverId, newRoom.create_at], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Messages.getAllChatRooms = (result) => {
    sql.query("select * from chat_rooms;", [], function (err, res, fields) {
        if (err) {
            console.log("error happen when serach message " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from  message " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};



Messages.updateById = (messages, idMessages, result) => {

};

Messages.removeById = (idMessages, result) => {

};

Messages.getMessageInfoById = (idMessages, result) => {

};

Messages.getAllMessageInfoByChatSessionId = (idChatSession, result) => {
    sql.query("select * from Message where idSession =? and status = '1'", [idChatSession], function (err, res, fields) {
        if (err) {
            console.log("error happen when serach message " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from  message " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

Messages.getAllMessagesByRoomId = (roomId, result) => {
    sql.query("select * from Message where room_id =? and status = '1'", [roomId], function (err, res, fields) {
        if (err) {
            console.log("error happen when serach message " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from  message " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

module.exports = Messages;