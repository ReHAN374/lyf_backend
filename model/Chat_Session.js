const sql = require('../utill/database');



const Chat_Session = function (newChatSession) {
    this.idSender = newChatSession.idSender;
    this.idResiver = newChatSession.idResiver;
    this.status = newChatSession.status;
    this.create_at = newChatSession.create_at;
    this.update_at = newChatSession.update_at;
    this.remove_at = newChatSession.remove_at;
};

Chat_Session.create = (newChatSession, result) => {
    sql.query("INSERT INTO `chatSession` (`idSender`, `idResiver`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?);", [newChatSession.idSender, newChatSession.idResiver, newChatSession.status, newChatSession.create_at, newChatSession.update_at, newChatSession.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created chat session: ", { id: res.insertId, ...newChatSession });
        result(null, { id: res.insertId, ...newChatSession });
    });
};

Chat_Session.updateById = (chatSession, idChatSession, result) => {

};

Chat_Session.removeById = (idChatSession, result) => {

};

Chat_Session.getChatSessionInfoById = (idChatSession, result) => {

};

Chat_Session.getAllChatSessionInfoByUserId = (idUser, result) => {
    // sql.query("select * from chatSession where idSender =? and status = '1'", [idUser], function (err, res, fields) {
    //     if (err) {
    //         console.log("error happen when serach chat session " + err);
    //         result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
    //     } else {
    //         console.log(" data from chat session " + res);
    //         result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    //     }
    // });

    var dt = getAllChatSessionWithUserInfo(idUser);
    var finalArray = [];
    dt.then((sessionList)=>{
        let updateSession = sessionList.map(async (sessions)=>{
            try {
                var msgList = await getAllMessageFromChats(sessions);
                console.log(" data return");
                finalArray.push(msgList);
              } catch (error) {
                console.log("error happen load messages " + error);
              }
        });
        Promise.all(updateSession).then((value) => {
            result(JSON.stringify({ "status": 200, "err": [], "response": finalArray }));
          }).catch((er) => {
            console.log("errors happen "+er);
          });

    }).catch((err)=>{
        console.log("error happen get Ads Info " + err);
        result(JSON.stringify({ "status": 200, "err": err, "response": [] }));
    });
};


function getAllChatSessionWithUserInfo(idUser) {
    var chatList = [];
    return new Promise(function (resolve, reject) {
        sql.query("select chatSession.idchatSession as idChatSession , chatSession.create_at as chatStartDate, User.f_name as f_name, User.l_name as l_name, User.profile_url as profileLink, User.idUser as resiverId from chatSession left join User on chatSession.idResiver = User.idUser where chatSession.idSender = ? and chatSession.status = '1';", [idUser], function (err, res, fields) {
            if (err) {
                chatList = [];
                return reject(err);
            } else {
                chatList = res;
                console.log("Ads data " + chatList);
            }
            resolve(chatList, fields);
        });
    });
};

function getAllMessageFromChats(session) {
    let singleChat = [];
    return new Promise(function (resolve, reject) {
        var element = null;
        sql.query("select * from Message where idSession =? and status = '1'", [session.idChatSession], function (err, res, fields) {
            if (err) {
                var singleSession = {
                    "idchatSession": session.idChatSession,
                    "chatName": session.f_name + " " + session.l_name,
                    "chatStartDate": session.chatStartDate,
                    "senderId": session.resiverId,
                    "profileLink": session.profileLink,
                    "chat": []
                }
                element = singleSession;
                singleChat.push(element);
                console.log("error happen when get data from Ads Image " + errs);
                return reject(singleChat);
            } else {
                var singleSession = {
                    "idchatSession": session.idChatSession,
                    "chatName": session.f_name + " " + session.l_name,
                    "chatStartDate": session.chatStartDate,
                    "senderId": session.resiverId,
                    "profileLink": session.profileLink,
                    "chat": res
                }
                element = singleSession;
                singleChat.push(element);
            }
            resolve(singleChat);
        });
    });
}

module.exports = Chat_Session;