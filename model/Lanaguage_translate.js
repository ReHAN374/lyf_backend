const fs = require('fs');
const Language_EN = require('../translate/English/translate_manager');
const path = require('path');

const LanguageENG = function(){

};

LanguageENG.getScreenTranslateInfo = result =>{
    fs.readFile(path.join(__dirname,'../translate/English/mainscreen_translate_english.json'), 'utf8', (err, data) => { 
        if (err) {
           // console.log(`Error reading file from disk: ${err}`);
            result(null,JSON.stringify({"status":200,"error":err,"response": null}));
        } else {
            result(null,JSON.stringify({"status":200,"error":null,"response": JSON.parse(data)}));
            
        }
    
    });  
}

module.exports = LanguageENG;