var mongoose = require('./db/mongoose');
var { Users } = require('./db/models/users');
var { Properties } = require('./db/models/properties');

handle_request = (msg, callback) => {
    console.log("hello");
    var propertyID = msg.propertyID;
    Properties.findOne({
        _id: propertyID
    }, (err, property) => {
        if (err) {
            callback(err, "Couldn't fetch property result from DB");
        }
        else {
            console.log(property);
            callback(null, property);
        }
    })
}

exports.handle_request = handle_request;