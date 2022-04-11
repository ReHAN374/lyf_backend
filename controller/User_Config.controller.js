const UC = require('../model/user_config');

exports.update = (req, res) => {
    var data = {
        "idUser": req.body.idUser,
        "allow_show_my_mobile": req.body.allow_show_my_mobile,
        "subcribe_for_off": req.body.subcribe_for_off,
        "recommendation": req.body.recommendation
    };
    UC.update(data).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: 'user config updated successfully'
        })
    }).catch(error => {
        res.status(400).json({
            status: 400,
            error: error,
            response: null
        });
    })
}