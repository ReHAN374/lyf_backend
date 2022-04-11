const FAQ = require('../model/faq');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var createTime = new Date();

    var newFaq = {
        "quiz": req.body.quiz,
        "answer": req.body.answer,
        "status": "1",
        "create_at": createTime,
        "update_at": null,
        "remove_at": null
    }

    FAQ.create(newFaq, function (err, data) {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the FAQ."
            });
        else resp.send(data);
    });
};

exports.getAllFAQInfo = (req, resp) => {
    FAQ.getAllFaqInfo(function (err, data) {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};