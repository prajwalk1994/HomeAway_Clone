var crypt = require('../lib/crypt');
var { mongoose } = require('../db/mongoose');
var { Users } = require('../db/models/users');

exports.travellerSignup = function (req, resp) {
    console.log("Traveller Signup post request");
    var email = req.body.email;
    var password = req.body.password;
    var fullName = req.body.fullName;

    crypt.generateHash(password, function (err, hash) {
        var User = new Users({
            email,
            password: hash,
            fullName,
            role: "Traveller",
        })

        User.save().then((user) => {
            resp.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            resp.end("Traveller added succesfully");
        }, (err) => {
            resp.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            resp.end("Error While Creating new Traveller");
        })
    })
}

exports.ownerSignup = function (req, resp) {
    console.log("Owner Signup post request");
    var email = req.body.email;
    var password = req.body.password;
    var fullName = req.body.fullName;

    crypt.generateHash(password, function (err, hash) {
        var User = new Users({
            email,
            password: hash,
            fullName,
            role: "Owner",
        })

        User.save().then((user) => {
            resp.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            resp.end("Owner added succesfully");
        }, (err) => {
            resp.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            resp.end("Error While Creating new Owner");
        })
    })
}