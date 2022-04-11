const Sub_Category = require('../model/Sub_Category');
const SubCategory = require('../model/Sub_Category');

//!Create sub category
exports.create = (req, res) => {
    Sub_Category.uploadSubCategoryPhoto(req, res, err => {
        if (err) {
            return res.json({
                status: 400,
                error: err,
                response: null
            })
        }
        const newSubCategory = {
            "Sub_Cat_name": req.body.Sub_Cat_name,
            "idAds_Category": req.body.idAds_Category,
            "Icon_path": res.req.file.path,
            "Colour": req.body.Colour,
            "lan_code": req.body.lan_code
        };
        Sub_Category.create(newSubCategory, function (err1, res2) {
            if (err1) {
                return res.status(400).json({
                    status: 400,
                    error: err1,
                    response: null
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    error: null,
                    response: "Sub category created successfuly!",
                });
            }
        });
    })
};


exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getSubCategoryById = (req, resp) => {
    var mainCatId = req.body.catgergoryID;
    SubCategory.getAllSubCategory(function (err, data) {
        console.log("send data " + data);
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

exports.getAllSubCatListByCat = (req, resp) => {
    var mainCatId = req.body.catgergoryID;
    SubCategory.getAllSubCategoryInfoByCatID(mainCatId, function (err, data) {
        console.log("send data " + data);
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

exports.getAllSubCategory = (req, resp) => {

    var mainCatId = req.body.catgergoryID;
    var lan_code = req.body.lan_code

    // var mainCatId = req.body.catgergoryID;
    SubCategory.getAllSubCategory(function (err, data) {

        console.log("send data " + data);
        if (err)
            resp.send(err);
        resp.send(data);
    });
};