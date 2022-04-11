const ContactUs = require('../model/contact_us');

exports.create = (req,resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newConatctUs = {
        "username" : req.body.username,
        "mail_address" : req.body.mail_address,
        "message" : req.body.message,
        "status" : "1",
        "relpy_message" : "1",
        "create_at" : createTime,
        "update_at" : null,
        "remove_at" : null
    }

    ContactUs.create(newConatctUs,(err,data)=>{
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new Contact Message."
            });
        else resp.send(data);
    }); 
};

exports.getAllContactUsMessage = (req, resp) => {

};