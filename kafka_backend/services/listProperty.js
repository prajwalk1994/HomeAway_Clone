var mongoose = require('./db/mongoose');
var { Properties } = require('./db/models/properties');

handle_request = (msg, callback) => {
    let property = new Properties({
        Owner: msg.Owner,
        Title: msg.Title,
        Description: msg.Description,
        Bedrooms: msg.Bedrooms,
        Bathrooms: msg.Bathrooms,
        StartDate: msg.StartDate,
        EndDate: msg.EndDate,
        Address: msg.Address,
        Rate: msg.Rate,
        City: msg.City,
        State: msg.State,
        Zip: msg.Zip,
        NumberOfGuests: msg.NumberOfGuests,
        Amneties: msg.Amneties,
        Images: msg.Images,
    })
    property.save(property).then((property) => {
        callback(null, property);
    },(err) => {
        callback(err, "Error listing property in the database");
    })
}

exports.handle_request = handle_request;