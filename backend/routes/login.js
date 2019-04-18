var crypt = require('../lib/crypt');
var { mongoose } = require('../db/mongoose');
var { Users } = require('../db/models/users');

var { strategy, jwtOptions } = require('../lib/passportAuth');
var jwt = require('jsonwebtoken');
var passport = require('passport');

exports.travellerLogin = function (req, resp) {
    console.log("Traveller Login request");
    var email = req.body.email;
    var password = req.body.password;
    Users.findOne({
        email: req.body.email,
        role : "Traveller",
    }, function (err, user) {
        if (err) {
            console.log("Invalid login");
            resp.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            resp.end("Invalid credentials");
        } else if (user) {
            crypt.compareHash(password, user.password, function (error, isMatch) {
                if (isMatch) {
                    let jwtToken = jwt.sign({ email: user.email }, jwtOptions.secretOrKey);
                    resp.cookie('travellerCookie', email, { maxAge: 9000000, httpOnly: false, path: '/' });
                    // req.session.user = result;
                    resp.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    resp.end(JSON.stringify({
                        email: user.email,
                        fullName: user.fullName,
                        token: jwtToken,
                    }));
                }
            })
        }
    })
}

exports.ownerLogin = function (req, resp) {
    console.log("Owner Login request");
    var email = req.body.email;
    var password = req.body.password;
    Users.findOne({
        email: req.body.email,
        role : "Owner",
    }, function (err, user) {
        if (err) {
            console.log("Invalid login");
            resp.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            resp.end("Invalid credentials");
        } else if (user) {
            crypt.compareHash(password, user.password, function (error, isMatch) {
                if (isMatch) {
                    let jwtToken = jwt.sign({ email: user.email }, jwtOptions.secretOrKey);
                    resp.cookie('ownerCookie', email, { maxAge: 9000000, httpOnly: false, path: '/' });
                    // req.session.user = result;
                    resp.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    resp.end(JSON.stringify({
                        email: user.email,
                        fullName: user.fullName,
                        token: jwtToken,
                    }));
                }
            })
        }
    })
}