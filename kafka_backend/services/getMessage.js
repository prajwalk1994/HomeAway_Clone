const mongoose = require('./db/mongoose');
var {Messages} = require('./db/models/messages');

handle_request = (msg, callback) => {
    Messages.find(msg, (error, messages) => {
        if(error){
            callback(error, "Could'nt fetch messages successfully");
        }else{
            callback(null, messages);
        }
    })
}

exports.handle_request = handle_request;