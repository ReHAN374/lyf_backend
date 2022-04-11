const Ads_Category = require('../model/Ads_Catogery');

//!Create main category
exports.create = (req, res) => {
    Ads_Category.uploadCategoryPhoto(req, res, err => {
        if (err) {
            return res.json({
                status: 400,
                error: err,
                response: null
            })
        }
        const newAdsCategory = {
            "Category_name": req.body.Category_name,
            "Icon_path": res.req.file.path,
            "Colour": req.body.Colour,
            "lan_code": req.body.lan_code
        };
        Ads_Category.create(newAdsCategory, function (err1, res2) {
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
                    response: "Category created successfuly!",
                });
            }
        });
    })
};


//!Get all cat info
exports.getAllMainCategory = (req, res) => {
    var lan_code = req.body.lan_code
    Ads_Category.getAllAdsMainCategory(lan_code, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 400,
                error: err,
                response: null
            });
        } else {
            res.status(200).json({
                status: 200,
                response: data,
                error: null
            })
        }
    });
};

//!Get all main and sub cat info 
exports.getAllMainAndSubCat = (req, res) => {
    Ads_Category.getAllCatAndSubInfo(req.body.lan_code).then(success => {
        res.status(200).json({
            status: 200,
            response: success,
            error: null
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
};


//!Get all main and sub cat info 
exports.getAllCategory = (req, res) => {
    Ads_Category.getAllCategory(req.body.lan_code).then(async success => {
      if (success.length == 0) {
        return res.status(200).json({
            status: 200,
            error: null,
            response: []
        })
    }

    var allInfo = [];
    

    for (let i = 0; i < success.length; i++) {

     var data = {
        cat_id : success[i].id_ads_category,
        cat : success[i].category_name,
        cat_icon : success[i].Icon_path
    };


     // get sub category data
     try {
        var subcat_response = await Ads_Category.getAllSubCatById(success[i].id_ads_category);

        var subcatArr =  [];
        for (var j = 0; j < subcat_response.length; j++) {

            var myObj = { 
                sub_cat_id : subcat_response[j].id_sub_category,
                sub_cat_name : subcat_response[j].sub_cat_name,
                sub_cat_icon : subcat_response[j].Icon_path
            }

            subcatArr.push( myObj );
            data.subcat = subcatArr;

        }

    } catch (error) {
        console.log(error);
        throw error;
    }

    allInfo.push(data);
}

res.status(200).json({
    status: 200,
    error: null,
    response: {
     allInfo
 }
})



}).catch(e => {
    res.status(400).json({
        status: 400,
        error: e,
        response: null
    });
})
};