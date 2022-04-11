const axios = require('axios');

const { json } = require('body-parser');
const Ads_Info = require('../model/Ads_Info');
const AdsImage = require('../model/Ads_Image');
const AdsSubInfo = require('../model/Ads_Sub_info');
const VehicalAds = require('../model/Vehical_Ads');
const ElectronicAds = require('../model/Electronics_Ads');
const RealStateAds = require('../model/Real_State_Ads');
const MusicAds = require('../model/Music_Ads');
const GetImg = require('../model/Ads_Image');
const Pet_Ads = require('../model/Pet_Ads');
const Ads_Sub_Info = require('../model/Ads_Sub_info');
const Sport_Ads = require('../model/Sport_Ads');
const User = require('../model/user');
const Notification = require('../model/Notification_Ads');

//!Create new vehical ads and save img list
exports.createVehicalAds = (req, res) => {
    var newAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "id_user": req.body.id_user,
        "lan_code": req.body.lan_code,
        "phone_number": req.body.phone_number,
        "status": req.body.status,
        "calls_only": req.body.calls_only
    };
    Ads_Info.create(newAds).then(success1 => {
        var adsSub = {
            "id_ads": success1.insertId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.create(adsSub).then(success2 => {
            var vehicalData = {
                vehical_brand: req.body.vehicalBrand,
                vehical_model: req.body.vehicalModel,
                manifacture_year: req.body.manifactureYear,
                mileage: req.body.mileage,
                idtransmission_type: req.body.transmissionTypeId,
                eng_capacity: req.body.engCapacity,
                idAds_Sub_info: success2.insertId,
                idfuel_type: req.body.fuelTypeId,
                idcolor: req.body.colorId
            }
            return VehicalAds.create(vehicalData).then(success3 => {
                if (req.body.type == "translate") {
                    let i;
                    var imgList = [];
                    for (i = 0; i < req.body.imageData.length; i++) {
                        var imgData = {
                            adsId: success1.insertId,
                            imgUrl: req.body.imageData[i],
                            imgName: req.body.imageData[i]
                        };
                        imgList.push(imgData);
                        Ads_Info.saveImgPath(imgData).then(success4 => {
                        }).catch(e => {
                            res.status(400).json({
                                status: 400,
                                error: e,
                                response: null
                            })
                        })

                    }
                    res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            ...newAds,
                            ...adsSub,
                            ...vehicalData,
                            imgList: imgList
                        }
                    })
                } else {
                    if (req.files.files.length > 0) {
                        let i;
                        var imgList = [];
                        for (i = 0; i < req.files.files.length; i++) {
                            var imgData = {
                                adsId: success1.insertId,
                                imgUrl: req.files.files[i].path,
                                imgName: req.files.files[i].filename
                            };
                            imgList.push(imgData);
                            Ads_Info.saveImgPath(imgData).then(success4 => {

                            }).catch(e => {
                                res.status(400).json({
                                    status: 400,
                                    error: e,
                                    response: null
                                })
                            })
                        }
                        return res.status(200).json({
                            status: 200,
                            error: null,
                            response: {
                                ...newAds,
                                ...adsSub,
                                ...vehicalData,
                                imgList: imgList
                            }
                        })
                    }
                }
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Create new electronic ads
exports.createElectronicAds = (req, res) => {
    var newAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "id_user": req.body.id_user,
        "lan_code": req.body.lan_code,
        "phone_number": req.body.phone_number,
        "status": req.body.status,
        "calls_only": req.body.calls_only
    };
    Ads_Info.create(newAds).then(success1 => {
        var adsSub = {
            "id_ads": success1.insertId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.create(adsSub).then(success2 => {
            var elcData = {
                "id_electroinc_brand": req.body.electronicBrandId,
                "id_ads_sub_info": success2.insertId
            }
            return ElectronicAds.create(elcData).then(success3 => {
                if (req.body.type == "translate") {
                    let i;
                    var imgList = [];
                    for (i = 0; i < req.body.imageData.length; i++) {
                        var imgData = {
                            adsId: success1.insertId,
                            imgUrl: req.body.imageData[i],
                            imgName: req.body.imageData[i]
                        };
                        imgList.push(imgData);
                        Ads_Info.saveImgPath(imgData).then(success4 => {

                        }).catch(e => {
                            res.status(400).json({
                                status: 400,
                                error: e,
                                response: null
                            })
                        })
                    }
                    return res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            ...newAds,
                            ...adsSub,
                            ...elcData,
                            imgList: imgList
                        }
                    })
                } else {
                    if (req.files.files.length > 0) {
                        let i;
                        var imgList = [];
                        for (i = 0; i < req.files.files.length; i++) {
                            var imgData = {
                                adsId: success1.insertId,
                                imgUrl: req.files.files[i].path,
                                imgName: req.files.files[i].filename
                            };
                            imgList.push(imgData);
                            Ads_Info.saveImgPath(imgData).then(success4 => {

                            }).catch(e => {
                                // console.log(e);
                            })
                        }
                        return res.status(200).json({
                            status: 200,
                            error: null,
                            response: {
                                ...newAds,
                                ...adsSub,
                                ...elcData,
                                imgList: imgList
                            }
                        })
                    }
                }
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Create new Real Estate adsAC
exports.createRealEstateAds = (req, res) => {
    var newAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "id_user": req.body.id_user,
        "lan_code": req.body.lan_code,
        "phone_number": req.body.phone_number,
        "status": req.body.status,
        "calls_only": req.body.calls_only
    };
    Ads_Info.create(newAds).then(success1 => {
        var adsSub = {
            "id_ads": success1.insertId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.create(adsSub).then(success2 => {
            var reAds = {
                land_size: req.body.landsize ? req.body.landsize : null,
                idLandType: req.body.landtypeId ? req.body.landtypeId : null,
                bedroomCount: req.body.bedrooms ? req.body.bedrooms : null,
                bathroom_count: req.body.bathrooms ? req.body.bathrooms : null,
                house_size: req.body.housesize ? req.body.housesize : null,
                furniture_avalible: req.body.furnitureavailable ? req.body.furnitureavailable : null,
                floor_number: req.body.floornumber ? req.body.floornumber : null,
                developer: req.body.developer ? req.body.developer : null,
                idproperty_type: req.body.propertytypeId ? req.body.propertytypeId : null,
                permises: req.body.premises ? req.body.premises : null,
                banglow_avalibilty: req.body.bungalowavailable ? req.body.bungalowavailable : null,
                idlands_crops: req.body.landsCropId ? req.body.landsCropId : null,
                idAds_Sub_info: success2.insertId ? success2.insertId : null,
            };
            return RealStateAds.create(reAds).then(success3 => {
                if (req.body.type == "translate") {
                    let i;
                    var imgList = [];
                    for (i = 0; i < req.body.imageData.length; i++) {
                        var imgData = {
                            adsId: success1.insertId,
                            imgUrl: req.body.imageData[i],
                            imgName: req.body.imageData[i]
                        };
                        imgList.push(imgData);
                        Ads_Info.saveImgPath(imgData).then(success4 => {

                        }).catch(e => {
                            res.status(400).json({
                                status: 400,
                                error: e,
                                response: null
                            })
                        })
                    }
                    return res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            ...newAds,
                            ...adsSub,
                            ...reAds,
                            imgList: imgList
                        }
                    })
                } else {
                    if (req.files.files.length > 0) {
                        let i;
                        var imgList = [];
                        for (i = 0; i < req.files.files.length; i++) {
                            var imgData = {
                                adsId: success1.insertId,
                                imgUrl: req.files.files[i].path,
                                imgName: req.files.files[i].filename
                            };
                            imgList.push(imgData);
                            Ads_Info.saveImgPath(imgData).then(success4 => {

                            }).catch(e => {
                                // console.log(e);
                            })
                        }
                        return res.status(200).json({
                            status: 200,
                            error: null,
                            response: {
                                ...newAds,
                                ...adsSub,
                                ...reAds,
                                imgList: imgList
                            }
                        })
                    }
                }
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Create Pet ads
exports.createPetAds = (req, res) => {
    var newAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "id_user": req.body.id_user,
        "lan_code": req.body.lan_code,
        "phone_number": req.body.phone_number,
        "status": req.body.status,
        "calls_only": req.body.calls_only
    };
    Ads_Info.create(newAds).then(success1 => {
        var adsSub = {
            "id_ads": success1.insertId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return Ads_Sub_Info.create(adsSub).then(success2 => {
            var petAds = {
                idpet_type: req.body.idpet_type,
                idAds_Sub_info: success2.insertId
            };
            return Pet_Ads.create(petAds).then(success3 => {
                if (req.body.type == "translate") {
                    let i;
                    var imgList = [];
                    for (i = 0; i < req.body.imageData.length; i++) {
                        var imgData = {
                            adsId: success1.insertId,
                            imgUrl: req.body.imageData[i],
                            imgName: req.body.imageData[i]
                        };
                        imgList.push(imgData);
                        Ads_Info.saveImgPath(imgData).then(success4 => {

                        }).catch(e => {
                            res.status(400).json({
                                status: 400,
                                error: e,
                                response: null
                            })
                        })

                    }
                    return res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            ...newAds,
                            ...adsSub,
                            ...petAds,
                            imgList: imgList
                        }
                    })
                } else {
                    if (req.files.files.length > 0) {
                        let i;
                        var imgList = [];
                        for (i = 0; i < req.files.files.length; i++) {
                            var imgData = {
                                adsId: success1.insertId,
                                imgUrl: req.files.files[i].path,
                                imgName: req.files.files[i].filename
                            };
                            imgList.push(imgData);
                            Ads_Info.saveImgPath(imgData).then(success4 => {

                            }).catch(e => {
                            })
                        }
                        return res.status(200).json({
                            status: 200,
                            error: null,
                            response: {
                                ...newAds,
                                ...adsSub,
                                ...petAds,
                                imgList: imgList
                            }
                        })
                    }
                }
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//! Create Sport Ads
exports.createSportAds = (req, res) => {
    var newAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "id_user": req.body.id_user,
        "lan_code": req.body.lan_code,
        "phone_number": req.body.phone_number,
        "status": req.body.status,
        "calls_only": req.body.calls_only
    };
    Ads_Info.create(newAds).then(success1 => {
        var adsSub = {
            "id_ads": success1.insertId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return Ads_Sub_Info.create(adsSub).then(success2 => {
            var sportAds = {
                id_sport_type: req.body.id_sport_type,
                id_ads_sub_info: success2.insertId
            };
            return Sport_Ads.create(sportAds).then(success3 => {
                if (req.body.type == "translate") {
                    let i;
                    var imgList = [];
                    for (i = 0; i < req.body.imageData.length; i++) {
                        var imgData = {
                            adsId: success1.insertId,
                            imgUrl: req.body.imageData[i],
                            imgName: req.body.imageData[i]
                        };
                        imgList.push(imgData);
                        Ads_Info.saveImgPath(imgData).then(success4 => {

                        }).catch(e => {
                            res.status(400).json({
                                status: 400,
                                error: e,
                                response: null
                            })
                        })
                    }
                    return res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            ...newAds,
                            ...adsSub,
                            ...sportAds,
                            imgList: imgList
                        }
                    })
                } else {
                    if (req.files.files.length > 0) {
                        let i;
                        var imgList = [];
                        for (i = 0; i < req.files.files.length; i++) {
                            var imgData = {
                                adsId: success1.insertId,
                                imgUrl: req.files.files[i].path,
                                imgName: req.files.files[i].filename
                            };
                            imgList.push(imgData);
                            Ads_Info.saveImgPath(imgData).then(success4 => {

                            }).catch(e => {
                                // console.log(e);
                            })
                        }
                        return res.status(200).json({
                            status: 200,
                            error: null,
                            response: {
                                ...newAds,
                                ...adsSub,
                                ...sportAds,
                                imgList: imgList
                            }
                        })
                    }
                }
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Create music ads
exports.createMusicAds = (req, res) => {
    var newAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "id_user": req.body.id_user,
        "lan_code": req.body.lan_code,
        "phone_number": req.body.phone_number,
        "status": req.body.status,
        "calls_only": req.body.calls_only
    };
    Ads_Info.create(newAds).then(success1 => {
        var adsSub = {
            "id_ads": success1.insertId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return Ads_Sub_Info.create(adsSub).then(success2 => {
            var musicAds = {
                idinstrument_type: req.body.idinstrument_type,
                title: req.body.title,
                idAds_Sub_info: success2.insertId
            };
            return MusicAds.create(musicAds).then(success3 => {
                if (req.body.type == "translate") {
                    let i;
                    var imgList = [];
                    for (i = 0; i < req.body.imageData.length; i++) {
                        var imgData = {
                            adsId: success1.insertId,
                            imgUrl: req.body.imageData[i],
                            imgName: req.body.imageData[i]
                        };
                        imgList.push(imgData);
                        Ads_Info.saveImgPath(imgData).then(success4 => {

                        }).catch(e => {
                            res.status(400).json({
                                status: 400,
                                error: e,
                                response: null
                            })
                        })
                    }
                    return res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            ...newAds,
                            ...adsSub,
                            ...musicAds,
                            imgList: imgList
                        }
                    })
                } else {
                    if (req.files.files.length > 0) {
                        let i;
                        var imgList = [];
                        for (i = 0; i < req.files.files.length; i++) {
                            var imgData = {
                                adsId: success1.insertId,
                                imgUrl: req.files.files[i].path,
                                imgName: req.files.files[i].filename
                            };
                            imgList.push(imgData);
                            Ads_Info.saveImgPath(imgData).then(success4 => {

                            }).catch(e => {
                                // console.log(e);
                            })
                        }
                        return res.status(200).json({
                            status: 200,
                            error: null,
                            response: {
                                ...newAds,
                                ...adsSub,
                                ...musicAds,
                                imgList: imgList
                            }
                        })
                    }
                }
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Create collectibles ads
exports.createCollectibleAds = (req, res) => {
    var newAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "id_user": req.body.id_user,
        "lan_code": req.body.lan_code,
        "phone_number": req.body.phone_number,
        "status": req.body.status,
        "calls_only": req.body.calls_only
    };
    Ads_Info.create(newAds).then(success1 => {
        var adsSub = {
            "id_ads": success1.insertId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        Ads_Sub_Info.create(adsSub).then(success2 => {
            if (req.body.type == "translate") {
                let i;
                var imgList = [];
                for (i = 0; i < req.body.imageData.length; i++) {
                    var imgData = {
                        adsId: success1.insertId,
                        imgUrl: req.body.imageData[i],
                        imgName: req.body.imageData[i]
                    };
                    imgList.push(imgData);
                    Ads_Info.saveImgPath(imgData).then(success4 => {

                    }).catch(e => {
                        res.status(400).json({
                            status: 400,
                            error: e,
                            response: null
                        })
                    })
                }
                return res.status(200).json({
                    status: 200,
                    error: null,
                    response: {
                        ...newAds,
                        ...adsSub,
                        // ...vehicalData,
                        imgList: imgList
                    }
                })
            } else {
                if (req.files.files.length > 0) {
                    let i;
                    var imgList = [];
                    for (i = 0; i < req.files.files.length; i++) {
                        var imgData = {
                            adsId: success1.insertId,
                            imgUrl: req.files.files[i].path,
                            imgName: req.files.files[i].filename
                        };
                        imgList.push(imgData);
                        Ads_Info.saveImgPath(imgData).then(success4 => {

                        }).catch(e => {
                            // console.log(e);
                        })
                    }
                    return res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            ...newAds,
                            imgList: imgList
                        }
                    })
                }
            }
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Create Other ads
exports.createOtherAds = (req, res) => {
    var newAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "id_user": req.body.id_user,
        "lan_code": req.body.lan_code,
        "phone_number": req.body.phone_number,
        "status": req.body.status,
        "calls_only": req.body.calls_only
    };
    Ads_Info.create(newAds).then(success1 => {
        var adsSub = {
            "id_ads": success1.insertId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        Ads_Sub_Info.create(adsSub).then(success2 => {
            if (req.body.type == "translate") {
                let i;
                var imgList = [];
                for (i = 0; i < req.body.imageData.length; i++) {
                    var imgData = {
                        adsId: success1.insertId,
                        imgUrl: req.body.imageData[i],
                        imgName: req.body.imageData[i]
                    };
                    imgList.push(imgData);
                    Ads_Info.saveImgPath(imgData).then(success4 => {
                    }).catch(e => {
                        res.status(400).json({
                            status: 400,
                            error: e,
                            response: null
                        })
                    })
                }
                return res.status(200).json({
                    status: 200,
                    error: null,
                    response: {
                        ...newAds,
                        ...adsSub,
                        imgList: imgList
                    }
                })
            } else {
                if (req.files.files.length > 0) {
                    let i;
                    var imgList = [];
                    for (i = 0; i < req.files.files.length; i++) {
                        var imgData = {
                            adsId: success1.insertId,
                            imgUrl: req.files.files[i].path,
                            imgName: req.files.files[i].filename
                        };
                        imgList.push(imgData);
                        Ads_Info.saveImgPath(imgData).then(success4 => {

                        }).catch(e => {
                            // console.log(e);
                        })
                    }
                    return res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            ...newAds,
                            imgList: imgList
                        }
                    })
                }
            }
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Update vehical ads by ads id (Edit ad)
exports.updateVehicalAds = (req, res) => {
    var updatedAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "adsId": req.body.adsId
    };
    Ads_Info.update(updatedAds).then(success1 => {
        var updatedSub = {
            "adsId": req.body.adsId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.update(updatedSub).then(success2 => {
            var updatedVehicalData = {
                vehical_brand: req.body.vehicalBrand,
                vehical_model: req.body.vehicalModel,
                manifacture_year: req.body.manifactureYear,
                mileage: req.body.mileage,
                idtransmission_type: req.body.transmissionTypeId,
                eng_capacity: req.body.engCapacity,
                idfuel_type: req.body.fuelTypeId,
                idcolor: req.body.colorId,
                id_ads_sub_info: req.body.id_ads_sub_info
            }
            return VehicalAds.update(updatedVehicalData).then(success3 => {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: 'Vehical ad updated successfully.'
                })
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!update electronic ads
exports.updateElectronicAds = (req, res) => {
    var updatedAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "adsId": req.body.adsId
    };
    Ads_Info.update(updatedAds).then(success1 => {
        var updatedSub = {
            "adsId": req.body.adsId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.update(updatedSub).then(success2 => {
            var updatedElectronicData = {
                id_electroinc_brand: req.body.id_electroinc_brand,
                id_ads_sub_info: req.body.id_ads_sub_info
            }
            return ElectronicAds.update(updatedElectronicData).then(success3 => {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: 'Electronic ad updated successfully.'
                })
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!update real state ads
exports.updateRealStateAds = (req, res) => {
    var updatedAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "adsId": req.body.adsId
    };
    Ads_Info.update(updatedAds).then(success1 => {
        var updatedSub = {
            "adsId": req.body.adsId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.update(updatedSub).then(success2 => {
            var reAds = {
                land_size: req.body.landsize ? req.body.landsize : null,
                idLandType: req.body.landtypeId ? req.body.landtypeId : null,
                bedroomCount: req.body.bedrooms ? req.body.bedrooms : null,
                bathroom_count: req.body.bathrooms ? req.body.bathrooms : null,
                house_size: req.body.housesize ? req.body.housesize : null,
                furniture_avalible: req.body.furnitureavailable ? req.body.furnitureavailable : null,
                floor_number: req.body.floornumber ? req.body.floornumber : null,
                developer: req.body.developer ? req.body.developer : null,
                idproperty_type: req.body.propertytypeId ? req.body.propertytypeId : null,
                permises: req.body.premises ? req.body.premises : null,
                banglow_avalibilty: req.body.bungalowavailable ? req.body.bungalowavailable : null,
                idlands_crops: req.body.landsCropId ? req.body.landsCropId : null,
                idAds_Sub_info: req.body.id_ads_sub_info,
            };
            return RealStateAds.update(reAds).then(success3 => {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: 'Real state ad updated successfully.'
                })
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!update pet ads
exports.updatePetAds = (req, res) => {
    var updatedAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "adsId": req.body.adsId
    };
    Ads_Info.update(updatedAds).then(success1 => {
        var updatedSub = {
            "adsId": req.body.adsId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.update(updatedSub).then(success2 => {
            var updatedPetData = {
                idpet_type: req.body.idpet_type,
                id_ads_sub_info: req.body.id_ads_sub_info
            }
            return Pet_Ads.update(updatedPetData).then(success3 => {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: 'Pet ad updated successfully.'
                })
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!update sport ads
exports.updateSportAds = (req, res) => {
    var updatedAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "adsId": req.body.adsId
    };
    Ads_Info.update(updatedAds).then(success1 => {
        var updatedSub = {
            "adsId": req.body.adsId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.update(updatedSub).then(success2 => {
            var updatedSportData = {
                id_sport_type: req.body.id_sport_type,
                id_ads_sub_info: req.body.id_ads_sub_info
            }
            return Sport_Ads.update(updatedSportData).then(success3 => {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: 'Sport ad updated successfully.'
                })
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//! update music ads
exports.updateMusicAds = (req, res) => {
    var updatedAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "adsId": req.body.adsId
    };
    Ads_Info.update(updatedAds).then(success1 => {
        var updatedSub = {
            "adsId": req.body.adsId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.update(updatedSub).then(success2 => {
            var updatedMusicData = {
                idinstrument_type: req.body.idinstrument_type,
                title: req.body.title,
                id_ads_sub_info: req.body.id_ads_sub_info
            }
            return MusicAds.update(updatedMusicData).then(success3 => {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: 'Music ad updated successfully.'
                })
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//! update collectable ads
exports.updateCollectableAds = (req, res) => {
    var updatedAds = {
        "ads_name": req.body.ads_name,
        "description": req.body.description,
        "sell_price": req.body.sell_price,
        "location": req.body.location,
        "adsId": req.body.adsId
    };
    Ads_Info.update(updatedAds).then(success1 => {
        var updatedSub = {
            "adsId": req.body.adsId,
            "id_ads_category": req.body.mainCatId,
            "id_sub_category": req.body.subCatId,
            "id_conditions": req.body.conditonId,
        };
        return AdsSubInfo.update(updatedSub).then(success2 => {
            res.status(200).json({
                status: 200,
                error: null,
                response: 'Collectable ad updated successfully.'
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Get ads info by ads id
exports.getAdsInfoByAdsIdNew = (req, res) => {
    var data = {
        uid: req.body.uid,
        adsId: req.body.adsId
    };
    Ads_Info.getAdsInfoByIdNew(data).then(result1 => {

        if (result1.length == 0) {
            return res.status(400).json({
                status: 400,
                error: 'This ads is not exists!',
                response: null
            });
        }
        var data = {
            "idAds_Sub_info": result1[0].id_ads_sub_info,
            "idAds_Category": result1[0].id_ads_category,
            "idSub_Category": result1[0].id_sub_category
        }

        return Ads_Info.getAdsInfoByAdsIdNew(data).then(result2 => {
            return GetImg.getAdsImgsByAdsId(req.body.adsId).then(result3 => {
                var adsInfo = {
                    ...result1[0],
                    ...result2[0],
                    "isFavorite": result1[0].isFavorite ? result1[0].isFavorite : 0,
                    "created_at": result1[0].AdsCreateTime.toLocaleDateString(),
                    "reg_date": result1[0].reg_date.toLocaleDateString(),
                    "ad_price": result1[0].sell_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    "imgList": result3
                }

                res.status(200).json({
                    status: 200,
                    error: null,
                    response: adsInfo
                })
            })
        })
    }).catch(error => {
        res.status(400).json({
            status: 400,
            error: error,
            response: null
        });
    })
}

//!Get all ads by user id
exports.getAdsByUserId = (req, res) => {
    var data = {
        uid: req.body.uid,
        limit: req.body.limit,
        offset: req.body.offset
    }
    Ads_Info.getAllAdsByUid(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category
            }
            var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
            var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);

            adsInfo.push({
                ...success1[i],
                "created_at": success1[i].AdsCreateTime.toLocaleDateString(),
                "ad_price": success1[i].sell_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                ...response2[0],
                isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                imgList: response1
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
};

//!Get my ads
exports.getMyAds = (req, res) => {
    var data = {
        uid: req.body.uid,
        limit: req.body.limit,
        offset: req.body.offset,
        status: req.body.status
    }

    Ads_Info.getMyAds(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category
            }

            var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
            var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
            adsInfo.push({
                ...success1[i],
                "created_at": success1[i].AdsCreateTime.toLocaleDateString(),
                "ad_price": success1[i].sell_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                ...response2[0],
                status: success1[i].status,
                isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                imgList: response1
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
};

//! Approve ads by admin
//!Also create new notifications base on  notifyme
exports.approveAdsByAdmins = (req, res) => {
    var data = {
        updateTime: new Date(),
        adsId: req.body.adsId
    };
    Ads_Info.approveAdsInfoByAdmin(data).then(async success1 => {
        var response1 = await Ads_Info.getAdsInfoByAdsIdForNotifymeSection(req.body.adsId);
        var data = {
            sell_price: response1[0].sell_price,
            area: response1[0].location,
            id_ads_category: response1[0].id_ads_category,
            id_sub_category: response1[0].id_sub_category
        }
        return Notification.selectRelatedNotifyMe(data).then(async success2 => {
            for (var i = 0; i < success2.length; i++) {
                var data = {
                    id_notification: success2[i].id_notification,
                    id_ads_Info: req.body.adsId,
                    id_user: success2[i].id_user
                }
                try {
                    await Notification.createNotification(data);
                } catch (e) {
                    return res.status(400).json({
                        status: 400,
                        error: e,
                        response: null
                    });
                }
            }
            res.status(200).json({
                status: 200,
                error: null,
                response: "Success"
            })
        }).catch(e => {
            res.status(400).json({
                status: 400,
                error: e,
                response: null
            });
        })
    })
};

//!Reject ads by admin
exports.reject = (req, res) => {
    var data = {
        updateTime: new Date(),
        adsId: req.body.adsId
    };
    Ads_Info.reject(data).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "Success"
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
};

//!Get all pending ads
exports.getAllPendingAdsToAproveAdmin = (req, res) => {
    var data = {
        limit: req.body.limit,
        offset: req.body.offset,
    }
    Ads_Info.getAllPendingAds(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category
            }
            var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
            var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
            adsInfo.push({
                ...success1[i],
                "create_at": success1[i].AdsCreateTime,
                ...response2[0],
                imgList: response1
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
};

//!Get recent ads
exports.recentAds = (req, res) => {
    var data = {
        uid: req.body.uid,
        limit: req.body.limit,
        offset: req.body.offset,
        lan_code: req.body.lan_code
    }
    Ads_Info.getRecentAds(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }

        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category
            }
            var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
            var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
            
            adsInfo.push({
                ...success1[i],
                "created_at": success1[i].AdsCreateTime.toLocaleDateString(),
                "ad_price": success1[i].ad_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                "ads_name": success1[i].ads_name.substring(0,30),
                ...response2[0],
                isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                imgList: response1
            })
        }

        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
}


// exports.recentAds = (req, res) => {
//     var data = {
//         uid: req.body.uid,
//         limit: req.body.limit,
//         offset: req.body.offset,
//         lan_code: req.body.lan_code
//     }
//     Ads_Info.getRecentAds(data).then(async (success1) => {
//         if (success1.length == 0) {
//             return res.status(200).json({
//                 status: 200,
//                 error: null,
//                 response: []
//             })
//         }
//         var adsInfo = [];
//         for (let i = 0; i < success1.length; i++) {
//             var data = {
//                 "idAds_Sub_info": success1[i].IdAdsSubInfo,
//                 "idAds_Category": success1[i].id_ads_category,
//                 "idSub_Category": success1[i].id_sub_category
//             }
//             var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
//             var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);

//             adsInfo.push({
//                 "ad_id":success1[i].id_ads_info,
//                 "ad_name":success1[i].ads_name,
//                 "ad_description":success1[i].AdsDescription,
//                 "ad_price":success1[i].sell_price,
//                 "ad_location":success1[i].location,
//                 "ad_phone_number":success1[i].phone_number,
//                 "ad_lan_code":success1[i].lan_code,
//                 // "ad_calls_only":success1[i].calls_only,
//                 "ad_status":success1[i].status,
//                 "ad_created_at": success1[i].AdsCreateTime.toLocaleDateString(),
//                 // "user_uid": success1[i].id_user,
//                 // "user_fname": success1[i].f_name,
//                 // "user_lname": success1[i].l_name,
//                 // "user_telnumber": success1[i].tel_number,
//                 // "user_email": success1[i].email_address,
//                 // "user_register_date": success1[i].reg_date,
//                 // "user_type": success1[i].type,
//                 ...response2[0],
//                 // isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
//                 "ad_favorite_status": success1[i].isFavorite,
//                 "imgList": response1
//             })
//         }


//             console.log(adsInfo);

//         res.status(200).json({
//             status: 200,
//             error: null,
//             response: adsInfo
//         })
//     }).catch(e => {
//         res.status(400).json({
//             status: 400,
//             error: e,
//             response: null
//         });
//     })
// }


//!Get all ads
exports.getAll = (req, res) => {
    var data = {
        "uid": req.body.uid,
        "limit": req.body.limit,
        "offset": req.body.offset,
        "lan_code": req.body.lan_code,
    }
    Ads_Info.getAll(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category
            }
            var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
            var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
            adsInfo.push({
                ...success1[i],
                "create_at": success1[i].AdsCreateTime,
                ...response2[0],
                isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                imgList: response1
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
}

//!Get ads by main and sub cate id
exports.getAdsByMainSubID = (req, res) => {
    var data = {
        uid: req.body.uid,
        idSub_Category: req.body.idSub_Category,
        idAds_Category: req.body.idAds_Category,
        limit: req.body.limit,
        offset: req.body.offset,
        lan_code: req.body.lan_code
    }
    Ads_Info.getAdsByMainSubID(data, async function (err1, success1) {
        if (err1) {
            res.status(400).json({
                status: 400,
                error: err1,
                response: null
            });
        } else {
            if (success1.length == 0) {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: []
                })
            }
            var adsInfo = [];
            for (let i = 0; i < success1.length; i++) {
                var data = {
                    "idAds_Sub_info": success1[i].IdAdsSubInfo,
                    "idAds_Category": success1[i].id_ads_category,
                    "idSub_Category": success1[i].id_sub_category
                }
                var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
                var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
                adsInfo.push({
                    ...success1[i],
                    "created_at": success1[i].AdsCreateTime.toLocaleDateString(),
                    "ad_price": success1[i].ad_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    ...response2[0],
                    isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                    imgList: response1
                })
            }
            res.status(200).json({
                status: 200,
                error: null,
                response: adsInfo
            })
        }
    });
}

//!Get ads by main cate id
exports.getAdsByMainCatId = (req, res) => {
    var data = {
        uid: req.body.uid,
        idAds_Category: req.body.idAds_Category,
        limit: req.body.limit,
        offset: req.body.offset,
        lan_code: req.body.lan_code
    }
    Ads_Info.getAdsByMainCatId(data, async function (err1, success1) {
        if (err1) {
            res.status(400).json({
                status: 400,
                error: err1,
                response: null
            });
        } else {
            if (success1.length == 0) {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: []
                })
            }
            var adsInfo = [];
            for (let i = 0; i < success1.length; i++) {
                var data = {
                    "idAds_Sub_info": success1[i].IdAdsSubInfo,
                    "idAds_Category": success1[i].id_ads_category,
                    "idSub_Category": success1[i].id_sub_category
                }
                var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
                var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
                adsInfo.push({
                    ...success1[i],
                    "create_at": success1[i].AdsCreateTime,
                    ...response2[0],
                    isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                    imgList: response1
                })
            }
            res.status(200).json({
                status: 200,
                error: null,
                response: adsInfo
            })








            // result1.forEach(ads => GetImg.getAdsImgsByAdsId(ads.id_ads_info).then(result2 => {
            //     var adsInfo = {
            //         ...ads,
            //         "isFavorite": ads.isFavorite == 1 ? ads.isFavorite : 0,
            //         "imgList": result2
            //     }

            //     fullRes.push(adsInfo);
            //     if (result1[result1.length - 1].id_ads_info == ads.id_ads_info) {
            //         res.status(200).json({
            //             status: 200,
            //             error: null,
            //             response: fullRes
            //         })
            //     }

            // }).catch(e => {
            //     res.status(400).json({
            //         status: 400,
            //         error: e,
            //         response: null
            //     });
            // }))
        }
    });
}

//!Ads search 
exports.searchAds = (req, res) => {
    var data = {
        "key": req.body.key,
        "limit": req.body.limit,
        "offset": req.body.offset,
        "lan_code": req.body.lan_code,
        "uid": req.body.uid
    }
    Ads_Info.searchAds(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category
            }
            var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
            var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
            adsInfo.push({
                ...success1[i],
                "create_at": success1[i].AdsCreateTime,
                ...response2[0],
                isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                imgList: response1
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
}

//!Get ads count info by uid
exports.getAdsCountByUid = (req, res) => {
    var data = {
        uid: req.body.uid
    }
    Ads_Info.getAdsCountByUid(data).then(async success1 => {
        try {
            var response1 = await User.getFollowersCountByUid(data);
            var response2 = await Ads_Info.getFavAdsCountByUid(data);
        } catch (error) {
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: {
                ads_count: success1[0]["COUNT(*)"],
                fav_count: response2[0]["COUNT(*)"],
                followers_count: response1[0]["COUNT(*)"]
            }
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
}

//!Get all ads counts
exports.getAllAdsCountInfo = (req, res) => {
    var lanCode = req.body.lanCode;
    Ads_Info.getAllActiveAdsCount(lanCode).then(success1 => {
        return Ads_Info.getAllPendingAdsCount(lanCode).then(success2 => {
            return Ads_Info.getAllRejectedAdsCount(lanCode).then(success3 => {
                return Ads_Info.getAllAdsCount(lanCode).then(success4 => {
                    res.status(200).json({
                        status: 200,
                        error: null,
                        response: {
                            all_ads_count: success4[0]["COUNT(*)"],
                            active_ads_count: success1[0]["COUNT(*)"],
                            pendind_ads_count: success2[0]["COUNT(*)"],
                            rejected_ads_count: success3[0]["COUNT(*)"],
                        }
                    })
                }).catch(e => {
                    res.status(400).json({
                        status: 400,
                        error: e,
                        response: null
                    });
                })
            })
        })
    })
}

//!Get vehical filter ads
// exports.getFilterAds = (req, res) => {
//     var data = {
//         startPrice: req.body.startPrice,
//         endPrice: req.body.endPrice,
//         uid: req.body.uid,
//         adsCategory: req.body.adsCategory,
//         adsSubCategory: req.body.adsSubCategory,
//         lanCode: req.body.lanCode,
//         idCondition: req.body.idCondition,
//     }
//     Ads_Info.getFilterAds(data).then(async success1 => {
//         if (success1.length == 0) {
//             return res.status(200).json({
//                 status: 200,
//                 error: null,
//                 response: []
//             })
//         }
//         var adsInfo = [];
//         for (let i = 0; i < success1.length; i++) {
//             var data = {
//                 "idAds_Sub_info": success1[i].IdAdsSubInfo,
//                 "idAds_Category": success1[i].id_ads_category,
//                 "idSub_Category": success1[i].id_sub_category,
//                 idVehicalBrand: req.body.idVehicalBrand,
//                 idVehicalModel: req.body.idVehicalModel,
//                 year: req.body.year,
//                 startMileage: req.body.startMileage,
//                 endMileage: req.body.endMileage,
//                 startCapacity: req.body.startCapacity,
//                 endCapacity: req.body.endCapacity,
//                 idFuelType: req.body.idFuelType,
//                 idTransmissionType: req.body.idTransmissionType,
//                 id_lands_crops: req.body.id_lands_crops,
//                 id_property_type: req.body.id_property_type,
//                 id_land_type: req.body.id_land_type,
//                 id_electroinc_brand: req.body.id_electroinc_brand,
//                 id_sport_type: req.body.id_sport_type,
//                 id_instrument_type: req.body.id_instrument_type
//             }
//             try {
//                 var response2 = await Ads_Info.getAdsInfoByAdsIdWithFilters(data);
//                 var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
//             } catch (error) {
//                 console.log(error);
//                 throw error;
//             }
//             if (response2.length != 0) {
//                 adsInfo.push({
//                     ...success1[i],
//                     "create_at": success1[i].AdsCreateTime,
//                     ...response2[0],
//                     isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
//                     imgList: response1
//                 })
//             }
//         }
//         res.status(200).json({
//             status: 200,
//             error: null,
//             response: adsInfo
//         })
//     }).catch(e => {
//         res.status(400).json({
//             status: 400,
//             error: e,
//             response: null
//         });
//     })
// }


exports.getFilterAds = (req, res) => {
    var data = {
        startPrice: req.body.startPrice,
        endPrice: req.body.endPrice,
        lanCode: req.body.lanCode,
    }
    Ads_Info.getFilterAds(data).then(async success1 => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category,
            }
            try {
                // var response2 = await Ads_Info.getAdsInfoByAdsIdWithFilters(data);
                var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
            } catch (error) {
                console.log(error);
                throw error;
            }
            if (response1.length != 0) {
                adsInfo.push({
                    ...success1[i],
                    "create_at": success1[i].AdsCreateTime,
                    isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                    imgList: response1
                })
            }
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
}


//!Delete ads
exports.deleteAds = (req, res) => {
    var data = {
        adsId: req.body.adsId
    }
    Ads_Info.deleteAds(data).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "Ad deleted successfully."
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Edit ad by user
exports.editAdByUser = (req, res) => {
    var data = {
        adsId: req.body.adsId,
        ads_name: req.body.ads_name,
        description: req.body.description,
        sell_price: req.body.sell_price
    }
    Ads_Info.editAdByUser(data).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "Ad updated successfully."
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Delete image by image id
exports.deleteImageById = (req, res) => {
    Ads_Info.deleteImageById(req.body.imageId).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "Image deleted successfully."
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Add bulk data via ikman.lk
exports.getBulkDataFromIkman = async (req, res) => {
    var allAds = [];
    try {
        var response1 = await axios.get(req.body.url);
        const jsonstr = response1.data
        .split("window.initialData = ")[1]
        .split("</script>")[0];
        const jsonObj = JSON.parse(jsonstr);
        const allData = jsonObj.shopSerp.data.ads.map(async (ad, i, row) => {
            try {
                var response2 = await axios.get("https://ikman.lk/en/ad/" + ad.slug);

                const jsonstr = response2.data
                .split("window.initialData = ")[1]
                .split("</script>")[0];
                const jsonObj = JSON.parse(jsonstr);
                const adDetails = {
                    title: jsonObj.adDetail.data.title,
                    description: jsonObj.adDetail.data.description,
                    images: jsonObj.adDetail.data.ad.images.meta.map((img) =>
                        `${img.src}/2048/2048/fitted.jpg`.replace(
                            "https://i.ikman-st.com/",
                            "https://i.ikman-st.com/u/"
                            )
                        ),
                    contactInfo: {
                        name: jsonObj.adDetail.data.ad.contactCard.name,
                        phoneNumbers: jsonObj.adDetail.data.ad.contactCard.phoneNumbers.map(
                            (p) => p.number
                            ),
                    },
                    location: jsonObj.adDetail.data.ad.location.parent.name,
                    price: jsonObj.adDetail.data.ad.money,
                    properties: jsonObj.adDetail.data.ad.properties
                };
                return adDetails;
            } catch (error) {
            }
        })
        Promise.all(allData).then((responses) => {
            // console.log(responses)
            res.status(200).json({
                status: 200,
                error: null,
                response: responses
            })
        });

    } catch (error) {
    }
}

//!Search ad by user (Search my ads)
exports.searchAdByUser = (req,res)=>{
    var data = {
        "key": req.body.key,
        "limit": req.body.limit,
        "offset": req.body.offset,
        "lan_code": req.body.lan_code,
        "uid": req.body.uid,
        "status":req.body.status
    }
    Ads_Info.searchAdByUser(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category
            }
            var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
            var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
            adsInfo.push({
                ...success1[i],
                "create_at": success1[i].AdsCreateTime,
                ...response2[0],
                isFavorite: success1[i].isFavorite != null ? success1[i].isFavorite : 0,
                imgList: response1
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
}
