
var passportJwt = require('passport-jwt');
var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;
//Passport and JWT
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'cmpe273_lab2';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    var user = Users.findOne({ username: jwt_payload.email });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

module.exports = {strategy, jwtOptions}