var mongoose = require('./db/mongoose');
var { Users } = require('./db/models/users');
var { Properties } = require('./db/models/properties');

handle_request = (msg, callback) => {
    let Owner = msg.Owner;
    Properties.find({
        Owner,
    }, (err, properties) => {
        if (err) {
            callback(err, "Couldn't fetch owner properties");
        }
        else {
            callback(null, properties);
        }
    })
}

exports.handle_request = handle_request;