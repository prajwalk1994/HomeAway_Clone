var { mongoose } = require('./db/mongoose');
var { Users } = require('./db/models/users');
var { Properties } = require('./db/models/properties');

handle_request = (msg, callback) => {
    console.log("Inside the kafka backend for booking property");
    var property = msg.property;
    var traveller = msg.traveller;
    var startDate = msg.startDate;
    var endDate = msg.endDate;
    var numberOfGuests = msg.numberOfGuests;
    Users.findOneAndUpdate({
        email: traveller
    }, {
        $push: {
            bookedProperties: property
        }
        }, (err, result) => {
            if (err) {
                callback(err, "Error booking property")
            }
            else {
                Properties.findOneAndUpdate({
                    _id: property._id
                }, {
                        $push: {
                            Bookings: {
                                Traveller: traveller,
                                StartDate: startDate,
                                EndDate: endDate,
                                NumberOfGuests : numberOfGuests,
                            }
                        }
                    }, (err, result) => {
                        if (err) {
                            callback(err, "Error listing in booked properties for propertyID");
                        }
                        else {
                            callback(null, "Successfull");
                        }
                    });
            }
        });
}

exports.handle_request = handle_request;