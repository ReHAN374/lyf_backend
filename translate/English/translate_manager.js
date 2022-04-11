const main_screen_EN =  require('../English/mainscreen_translate_english.json');

exports.getMainScreenEN = () =>{
    console.log("callling "+JSON.stringify(main_screen_EN));
    return main_screen_EN;
};