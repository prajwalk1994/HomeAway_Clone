const mongoose = require('mongoose');

var Messages = mongoose.model('Messages',{
    Type: {
        type : String,
    },
    Traveller : {
        type : String,
    },
    Owner : {
        type : String,
    },
    isRead : {
        type : Boolean,
    },
    Text : {
        type : String,
    }
},'Messages');

module.exports = {Messages}