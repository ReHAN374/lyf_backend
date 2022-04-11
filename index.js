const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const multer = require("multer");
const path = require("path");

const sql = require('./utill/database');


const app = express();

var server = require('http').createServer(app);

const io = require('socket.io')(server, { cors: {} })


//enable app json only
const jsonParser = bodyParser.json();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
//app.use(uploads.array()); 
//app.use(express.static('./src'));

// // use core in app
app.use(cors());









//use json middelware for app
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));


//include all controllers
const Countrys = require('./controller/Country.controller');
const PetType = require('./controller/Pet_Type.controller');
const ElectronicBrand = require('./controller/Electroinc_Brand.controller');
const Instrument_Type = require('./controller/Instrument_Type.controller');
const Membership = require('./controller/Membership.controller');
const LandCrop = require('./controller/Lands_Crops.controller');
const PropertyType = require('./controller/Property_Type.controller');
const SportType = require('./controller/Sport_Type.controller');
const SubCategory = require('./controller/Sub_Category.controller');
const VehicalBrand = require('./controller/Vehical_Brand.controller');
const VehicalModel = require('./controller/Vehical_Model.controller');
const AdsCategory = require('./controller/Ads_Catogery.controller');
const User = require('./controller/User.controller');
const Area = require('./controller/Area.controller');
const AdsInfo = require('./controller/Ads_Info.controller');
const FavAds = require('./controller/favourite_Ads.controller');
const NotificationAds = require('./controller/Notification.controller');
const AdsFeature = require('./controller/Ads_Features.controller');
const AdsHasFeature = require('./controller/Ads_Has_Feature.controller');
const FAQ = require('./controller/faq.controller');
const ChatSessions = require('./controller/Chat_session.controller');
const Messages = require('./controller/Message.controller');
const ContactUs = require('./controller/Contact_Us.controller');
const LandType = require('./controller/Land_Type.controller');
const Colours = require('./controller/Colours.controller');
const TrasmissionType = require('./controller/Transmission_Type.controller');
const FuelType = require('./controller/Fuel_Type.controller');
const UserPrivilages = require('./controller/User_Privilages.controller');
const UserRole = require('./controller/User_Role.controller');
const UserHasPrivliages = require('./controller/user_has_privilages.controller');
const ApprtmentDeveloper = require('./controller/Apartment_Developer.controller');
const AdsReivew = require('./controller/AdsReivew.controller');
const Languages = require('./controller/language.controller');
const Transalte = require('./controller/Lanaguage_translate.controller');
const VehicalFilters = require('./controller/filter_Ads_Controller');
const ElectricFilters = require('./controller/electronicAdsFilter.contrller');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log("request "+req);
        cb(null, './src/Ads_image')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var singleStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log("request "+req);
        cb(null, './src/User_Profile')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });

var singleUpload = multer({ storage: singleStorage });

let uploadMultiple = upload.fields([{ name: 'file', maxCount: 12 }]);

let profileUploadMulter = singleUpload.fields([{ name: 'file', maxCount: 2 }]);

app.get('/', (req, resp) => {
    resp.send("Welcome to lyf-ads");
});


app.post('/api/getInstrumentTypeInfo', Instrument_Type.getAllInstrumentType);

// sportType manage
app.post('/api/addSportTypeInfo', jsonParser, SportType.create);







app.post('/api/getSportTypeInfo', SportType.getAllSportType);

// vehical brand manage

app.post('/api/addVehicalBrandInfo', jsonParser, VehicalBrand.create);







//app.post('/api/getVehicalBrandInfo', VehicalBrand.getAllVehicalBrand);

// vehical model manage

app.post('/api/addVehicalModelInfo', jsonParser, VehicalModel.create);

//app.post('/api/getVehicalModelInfo', VehicalModel.getAllVehicalModel);

// Electriconic Brand model
app.post('/api/addElectronicBrandInfo', jsonParser, ElectronicBrand.create);

app.post('/api/getAllElectronicBrandInfo', jsonParser, ElectronicBrand.getAllElectroincBrand);

//Instrument Type Model
app.post('/api/addInstrumentTypeInfo', jsonParser, Instrument_Type.create);

app.get('/api/getAllInstrumentTypeInfo', jsonParser, Instrument_Type.getAllInstrumentType);


app.post('/api/addNewNotification', jsonParser, NotificationAds.create);

app.post('/api/getAllNotification', jsonParser, NotificationAds.getAllNotification);

app.post('/api/getAllNotificationByUserId', jsonParser, NotificationAds.getAllNotificationByUserId);

app.post('/api/createNotificationAdsInfo', jsonParser, NotificationAds.createNotificationAdsInfo);

app.get('/api/getAllNotificationAdsInfo', jsonParser, NotificationAds.getAllNotificationAdsInfo);



//app.post('/api/getAllAdsByUser', jsonParser, AdsInfo.getAdsByUserId);

//app.get('/api/getAllAdsInfo', AdsInfo.getAllAdsInfo); // not used

//app.post('/api/getAllAdsInfoWithImages', AdsInfo.getAllAdsInfoWithImages);

//app.post('/api/getAllAdsByFilter', jsonParser, AdsInfo.getAdsInfoWithFilters);

//app.post('/api/addNewFavAds', jsonParser, FavAds.create);

//app.post('/api/getFavAdsListByUser', jsonParser, FavAds.getFavAdsByUsers);

//app.post('/api/getFeatureIDByName', jsonParser, AdsInfo.getFeatureIDByName);

//app.post('/api/getSingleFeatureAds', jsonParser, AdsInfo.getSingleFeatureAds);



//app.get('/api/getPendingAproveAdsInfo', jsonParser, AdsInfo.getAllPendingAdsToAproveAdmin);

//app.post('/api/updateById', jsonParser, AdsInfo.updateById);

//app.post('/api/removeFavoriteFromUser', jsonParser, FavAds.removeFavouriteById);

//app.get('/api/getPendingAproveAdsInfo', jsonParser, AdsInfo.getAllPendingAdsToAproveAdmin);


//app.post('/api/approveAdsByAdmin', jsonParser, AdsInfo.approveAdsByAdmins);

//app.post('/api/rejectAdsByAdmin', jsonParser, AdsInfo.rejectsAdsByAdmins);

//app.post('/api/getRelatedAdsByCatID',jsonParser,AdsInfo.getRelatedAdsByCat); 

//Ads Feature

app.post('/api/addAdsFeatures', jsonParser, AdsFeature.create);

app.post('/api/getAdsFeatureInfo', jsonParser, AdsFeature.getAllAdsFeatures);

//Ads has feature

app.post('/api/addAdsHasFeature', jsonParser, AdsHasFeature.create);

app.post('/api/getAllAdsFeatureByAdsId', jsonParser, AdsHasFeature.getAllAdsFeaturesUsingId);

app.post('/api/removeAdsHasFeatureUsingId', jsonParser, AdsHasFeature.removeAdsFeaturesInAds);

app.get('/api/getAllAdsHasFeatureInfo', jsonParser, AdsHasFeature.getAllAdsHasFeature);

//FAQ api

app.post('/api/addFAQInfo', jsonParser, FAQ.create);

app.get('/api/getAllFAQInfo', jsonParser, FAQ.getAllFAQInfo);

// chat apis

app.post('/api/initChat', jsonParser, ChatSessions.create);

app.post('/api/contiChats', jsonParser, Messages.create);

app.post('/api/pervoiseChatInfo', jsonParser, ChatSessions.getAllChatSeeionByUserId);

app.post('/api/createRoom', jsonParser, Messages.createRoom);

app.get('/api/getAllChatRooms', jsonParser, Messages.getAllChatRooms)

app.post('/api/getAllMessagesByRoomId', jsonParser, Messages.getAllMessagesByRoomId);

// set port, listen for requests


//contact us
app.post('/api/addNewContactUsMessage', jsonParser, ContactUs.create);

//Land Type 
app.post('/api/addNewLandTypeInfo', jsonParser, LandType.create);

app.post('/api/getAllLandTypeInfo', jsonParser, LandType.getAllLandTypeInfo);

app.post('/api/updateLandTypeInfo', jsonParser, LandType.updateLandTypeInfo);

app.post('/api/removeLandTypeInfo', jsonParser, LandType.removeFromLandTypeInfo);

// Transmisson Type

app.post('/api/addTransmissionInfo', jsonParser, TrasmissionType.create);

//app.post('/api/getAllTransmissionTypeInfo', jsonParser, TrasmissionType.getAllTransmissionTypeInfo);

app.post('/api/updateTrasmissionData', jsonParser, TrasmissionType.updateFromTransmissionType);

app.post('/api/removeFromTransmissoinType', jsonParser, TrasmissionType.removeFromTransmissionType);

//colours

app.post('/api/addNewColourInfo', jsonParser, Colours.create);

app.post('/api/getAllColoursInfo', jsonParser, Colours.getAllColoursInfo);

app.post('/api/updateColourInfo', jsonParser, Colours.updateColourInfoById);

app.post('/api/removeColoursInfo', jsonParser, Colours.removeFromColourInfo);

// fuel Type

app.post('/api/addNewFuelTypeInfo', jsonParser, FuelType.create);

app.post('/api/updateFuelTypeInfo', jsonParser, FuelType.updateById);

app.post('/api/removeByFuelTypeInfo', jsonParser, FuelType.removeById);

//app.post('/api/getAllFuelInfo', jsonParser, FuelType.getAllFuleInfo);

// privilage

app.post('/api/addNewPrivilageInfo', jsonParser, UserPrivilages.create);

app.post('/api/updatePrivilageInfo', jsonParser, UserPrivilages.updatePrivlageById);

app.post('/api/removePrivilageInfo', jsonParser, UserPrivilages.removePrivilageById);

app.get('/api/getAllPrivilageInfo', jsonParser, UserPrivilages.getAllPrivilagesInfo);

//user role

app.post('/api/addNewUserRoleInfo', jsonParser, UserRole.create);

app.post('/api/updateUserRoleInfo', jsonParser, UserRole.updateById);

app.post('/api/removeUserRoleInfo', jsonParser, UserRole.removebyId);

app.get('/api/getAllUserRoleInfo', jsonParser, UserRole.getAllUserRoleInfo);

//user has privilages

app.post('/api/addNewUserHasPrivilagesInfo', jsonParser, UserHasPrivliages.create);

app.post('/api/updateUserHasPrivilagesInfo', jsonParser, UserHasPrivliages.updateById);

app.post('/api/removeUserHasPrivilagesInfo', jsonParser, UserHasPrivliages.removeById);

app.post('/api/getAllUserHasPrivlagesInfoByRole', jsonParser, UserHasPrivliages.getAllPrivilageByRoleId);


// apprtement developer

app.post('/api/addNewApprtementDeveloperInfo', jsonParser, ApprtmentDeveloper.create);

app.get('/api/getAllApprtmentDeveloperInfo', jsonParser, ApprtmentDeveloper.getAllDeveloperInfo);

//ads Review apis

app.post('/api/addNewAdsReviewInfo', jsonParser, AdsReivew.create);

app.post('/api/updateAdsReviewById', jsonParser, AdsReivew.updateById);

app.post('/api/removeAdsReviewById', jsonParser, AdsReivew.removeById);

app.post('/api/getAdsReivewInfoByAdsId', jsonParser, AdsReivew.getAllAdsReiewsByAdsId);

app.post('/api/addNewLaguage', jsonParser, Languages.create);

app.post('/api/updateLagauageInfo', jsonParser, Languages.updateById);

app.post('/api/removeAdsInfo', jsonParser, Languages.removeById);

app.get('/api/getAllLaguageInfo', jsonParser, Languages.getAllLanguageInfo);


//app translate
app.post('/api/getScreenTranslateInfo', jsonParser, Transalte.getLanguageScreens);


//filters ads
app.post('/api/getVehicalFilterAds',jsonParser,VehicalFilters.getVehicalFilterAds);

app.post('/api/getElectronicFilterAds',jsonParser,ElectricFilters.filterElectroncAds);
app.post('/api/getRealStateFilterAds',jsonParser,VehicalFilters.getRealStateFilterAds);

app.post('/api/getPetFilterAds',jsonParser,VehicalFilters.getPetFilterAds);

app.post('/api/getSportFilterAds',jsonParser,VehicalFilters.getSportFilterAds);

app.post('/api/getMusicFilterAds',jsonParser,VehicalFilters.getMusicFilterAds);

app.post('/api/getCollectibleFilterAds',jsonParser,VehicalFilters.getCollectibleFilterAds);


//const db = require("./model/index");
//db.sequelize.sync();

require("./routes/ads_sub_info.routes")(app);
require("./routes/ads_has_feature.routes")(app);
require("./routes/ads_info.routes")(app);
require("./routes/chat.routes")(app);
require("./routes/user_config.routes")(app);
require("./routes/user.routes")(app);
require("./routes/favorite_ads.routes")(app);
require("./routes/notification.routes")(app);
require("./routes/membership.routes")(app);
require("./routes/area.routes")(app);
require("./routes/category.routes")(app);
require("./routes/real_estate.routes")(app);
require("./routes/country.routes")(app);
require("./routes/sub_cat.routes")(app);
require("./routes/property_type.routes")(app);
require("./routes/land_crops.routes")(app);
require("./routes/pet_type.routes")(app);
require("./routes/instrument.routes")(app);
require("./routes/fuel_type.routes")(app);
require("./routes/transmission_type.routes")(app);
require("./routes/vehecal_model.routes")(app);
require("./routes/vehical_brand.routes")(app);
require("./routes/colors.routes")(app);
require("./routes/sport_type.routes")(app);
require("./routes/music_instrument_type.routes")(app);
require("./routes/electronic_brand.routes")(app);
require("./routes/land_type.routes")(app);
require("./routes/developer_type.routes")(app);
require("./routes/favorite.routes")(app);
require("./routes/message.route")(app);
require("./routes/ads_images.routes")(app);



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
// app.listen(3001,()=> console.log("Listening to port 3000..."));

module.exports = app;