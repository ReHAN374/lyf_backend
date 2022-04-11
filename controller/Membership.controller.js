const Membership = require('../model/Membership.model');

//!Create membership
exports.create = (req, res) => {
    const newMembership = {
        "membership_name": req.body.membership_name,
        "descirption": req.body.descirption,
        "price": req.body.price,
        "free_ads_count": req.body.free_ads_count,
        "lan_code":req.body.lan_code
    };
    Membership.create(newMembership).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "Membership created succeefuly!"
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
};

//!Get membership by ID
exports.getMembershipById = (req, res) => {
    var mebId = req.body.membershipID;
    Membership.getMembershipInfoById(mebId).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: success
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    });
};

//!Get all membership
exports.getAllMembership = (req, res) => {
    var lan_code = req.body.lan_code
    Membership.getAllMembershipInfo(lan_code, function (err, data) {
        if (err) {
            res.status(400).json({
                status: 400,
                error: err,
                response: null
            })
        } else {
            res.status(200).json({
                status: 200,
                error: null,
                response: data
            })
        }
    });
};