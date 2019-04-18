
var mongoose = require('mongoose');
var Users = mongoose.model('Users', {
    email: {
        type: String
    },
    password: {
        type: String
    },
    role : {
        type: String 
    },
    fullName :{
        type : String
    },
    bookedProperties : {
        type : Array
    }
},'Users');
module.exports = { Users };