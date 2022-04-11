const Ads_Image = require('../model/Ads_Image');

//!Delete ads image by ads id
exports.deleteAdsImage = (req, res) => {
    var imageData = {
        imageId: req.body.imageId
    }
    Ads_Image.deleteImage(imageData).then(success1 => {
        return res.status(200).json({
            status: 200,
            error: null,
            response: 'Image deleted successfully.'
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


};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getAdsImageById = (req, resp) => {

};

exports.getAllAdsImage = (req, resp) => {

};