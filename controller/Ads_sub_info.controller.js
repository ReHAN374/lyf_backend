const Ads_Info = require('../model/Ads_Info');
const Ads_Sub_info = require('../model/Ads_Sub_info');

exports.getMaxPrice = (req, res) => {
    var data = {
        idSub_Category: 1
    }
    Ads_Sub_info.getMaxPrice(data, (err, response) => {
        if (err) {
            res.status(401).json({
                error: err,
                response: null
            })
        } else {
            res.status(200).json({
                error: null,
                response: response
            })
        }
    })
}