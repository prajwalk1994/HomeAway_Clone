var { mongoose } = require('./db/mongoose');
var { Users } = require('./db/models/users');
var { Properties } = require('./db/models/properties');

function handle_request(msg, callback){
    console.log("Inside kafka backend for fetching properties");
    var location = msg.location;
    var startDate = msg.startDate;
    var endDate = msg.endDate;
    let numberOfGuests = msg.numberOfGuests;
    Properties.find({
        City: location,
        NumberOfGuests : {
            $gte :  numberOfGuests
        },
        // StartDate : {
        //   $lte : startDate
        // },
        // EndDate : {
        //   $gte : endDate
        // },
        // Bookings : {
        //     $exists : true,
        //     $ne : []
        //     }
        }, (err, properties) => {
        if (err) {
            callback(null, "Couldn't fetch property details")
        }
        else {
            callback(null, properties);
            console.log(properties);
        }
    })
}

exports.handle_request = handle_request;