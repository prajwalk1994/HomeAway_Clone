const mongoose = require('mongoose');

var Properties = mongoose.model('Properties',{
    Title : {
        type : String
    },
    Owner: {
        type : String
    },
    Street : {
        type : String
    },
    City : {
        type :String
    },
    State: {
        type: String
    },
    Zip: {
        type: String
    },
    Bedrooms: {
        type: String
    },
    Bathrooms: {
        type: String
    },
    Rate: {
        type: String
    },
    Description: {
        type: String
    },
    Amneties: {
        type: Array
    },
    StartDate : {
        type: Date
    },
    EndDate: {
        type: Date
    },
    Bookings : {
        type : Array
    },
    Images: {
        type: Array
    },
    NumberOfGuests : {
        type : String
    },
},'Properties');

module.exports = {Properties}