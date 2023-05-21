const mongoose = require('mongoose')


// Définition du schéma de contact
var Contact = new mongoose.Schema(
    {
       FullName : {
        type : String , 
        required : true
       },
       Phone : {
        type : String,
        required : true
       }

        
    }
);



module.exports = mongoose.model('contacts',Contact);