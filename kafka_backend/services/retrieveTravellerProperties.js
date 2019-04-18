var mongoose = require('./db/mongoose');
var { Users } = require('./db/models/users');
var { Properties } = require('./db/models/properties');

handle_request = (msg, callback) => {
    var traveller = msg.traveller;
    Users.findOne({
        email: traveller
    }, (error, user) => {
        if (error) {
            callback(error, "Couldn't fetch traveller properties from DB");
        }
        else {
            console.log(user);
            (user)?((!user.bookedProperties)?callback(null, []):callback(null, user.bookedProperties)):callback(null,[]);
        }
    })
}

exports.handle_request = handle_request;