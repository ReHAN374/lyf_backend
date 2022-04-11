const Transaltion = require('../model/Lanaguage_translate');

exports.getLanguageScreens = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var Lan_Type = req.body.lanCode;
    var Page_Code = req.body.pageCode;

    if(Lan_Type == "EN"){
        // calling english
        console.log("calling english");
        Transaltion.getScreenTranslateInfo((err,data) => {
            console.log("data "+data);
            if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while transalte the Pages."
            });
        else resp.send(data);
        });

    }else if (Lan_Type == "SI"){
        // calling sinhala
    }else if (Lan_Type == "TM"){
        // calling tamil
    }
    
};