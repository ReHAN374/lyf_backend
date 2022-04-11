const ChatSession = require('../model/Chat_Session');
const Messages = require('../model/Message');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var createTime = new Date();

    const newChatSession = {
        "idSender" : req.body.idSender,
        "idResiver" : req.body.idResiver,
        "status" : "1",
        "create_at" : createTime,
        "update_at" : null,
        "remove_at" : null
    }

    ChatSession.create(newChatSession,(err,data)=>{

        if (err){
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Chat Session."
            });
        }else{
            //resp.send(data);
            var sessionChat = data;
            var sessionId = data.id;
            var newMessage = {
                "message_content" : req.body.message_content,
                "date" : createTime,
                "view_status" : "2",
                "send_status" : "1",
                "idSession" : sessionId,
                "senderId" : req.body.idSender,
                "status" : "1",
                "create_at" : createTime,
                "update_at" : null,
                "remove_at" : null
            }

            Messages.create(newMessage,(err,data)=>{
                if (err)
                    console.log("error on message save");
                else console.log("message save "+data);
            });
            resp.send(JSON.stringify({ "status": 200, "error": [], "data": sessionChat }));
        }
            
         
    });


};

exports.getAllChatSeeionByUserId = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var useriD = req.body.UserId;

    ChatSession.getAllChatSessionInfoByUserId(useriD,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};