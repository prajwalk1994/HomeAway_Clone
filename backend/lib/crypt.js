var bcrypt = require('bcryptjs');

exports.generateHash = (password, cb) =>{
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return cb(err);
        }
        else{
            bcrypt.hash(password, salt, function(err, hash){
                return cb(err, hash);
            })
        }
    })
}

exports.compareHash = (password, hash, cb) => {
    bcrypt.compare(password, hash, function (err, isPasswordMatch) {
        console.log(isPasswordMatch);
        return err == null ?
            cb(null, isPasswordMatch) :
            cb(err);
    });
}