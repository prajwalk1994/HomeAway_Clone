const mongoose = require('./db/mongoose');
var { Messages } = require('./db/models/messages');

handle_request = (msg, callback) => {
    const message = new Messages({
        Type: msg.Type,
        Owner: msg.Owner,
        Traveller: msg.Traveller,
        isRead : false,
        Text : msg.Text,
    })
    message.save(message).then((resp) => {
        callback(null, message);
    }, (error) => {
        callback(error, "Couldn't set the message in the Database");
    })
}

exports.handle_request = handle_request;