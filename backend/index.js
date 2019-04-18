var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var cors = require('cors');
app.set('view engine', 'ejs');
var glob = require('glob');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var {strategy, jwtOptions} = require('./lib/passportAuth');
var {travellerLogin, ownerLogin} = require('./routes/login'); 
var {travellerSignup, ownerSignup} = require('./routes/signup');
var {bookProperty, listProperty, getProperties, getPropertyResult} = require('./routes/properties');
var {retrieveTravellerProperties, retrieveOwnerProperties} = require('./routes/dashboard');
var {getMessage, setMessage} = require('./routes/messages');

app.use(session({
  secret:'asdfghjkklllzxcvbnm',
  resave:false,
  saveUninitialized:true
}));

app.use(cors({ origin: 'http://3.16.102.54', credentials: true }));

app.use(bodyParser.json());
app.use(express.static('./public/'));

passport.use(strategy);
app.use(passport.initialize());

//Image Upload

const storage = multer.diskStorage({
  destination : './public/uploads/',
  filename : function(req, file, cb){
    cb(null, "image"+ Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({
  storage : storage,
  fileFilter : function(req, file, cb){
    const filterExtensions = /jpg|jpeg|png/;
    const extension = filterExtensions.test(path.extname(file.originalname));
    const mimetype = filterExtensions.test(file.mimetype);
    if(extension && mimetype){
      cb(null,true);
    }
    else{
      cb("Please upload image files only", false);
    }
  }
}).array("images",5);


app.use(function(req, resp, next) {
  resp.setHeader('Access-Control-Allow-Origin', 'http://3.16.102.54');
    resp.setHeader('Access-Control-Allow-Credentials', 'true');
    resp.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    resp.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    resp.setHeader('Cache-Control', 'no-cache');
    next();
  });

//Image Upload
app.post('/uploadImages', function(req,resp){
  upload(req, resp, (error) => {
    console.log(req.body);
    if(error){
      console.log("Error uploading");
      resp.sendStatus(400);
    }
    else{
      console.log("Upload Successfull");
      fs.mkdir(__dirname+"/public/uploads/p"+String(req.body.Title),function(error){});
      var numberOfFiles = req.files.length;
      var i = 0;
      req.files.forEach(element => {
        i++;
        fs.renameSync('./public/uploads/'+element.filename, './public/uploads/p'+req.body.Title+"/"+i+path.extname(element.originalname));
      });
      resp.sendStatus(200);
    }
  })
})

app.post('/travellerLogin', travellerLogin);

app.post('/ownerLogin', ownerLogin);

app.post('/travellerSignup', travellerSignup);

app.post('/ownerSignup', ownerSignup)

app.post('/getProperties', getProperties);

app.post('/bookProperty', bookProperty);

app.post('/listProperty', listProperty)

app.post('/retrieveOwnerProperties', retrieveOwnerProperties) 

app.post('/retrieveTravellerProperties', retrieveTravellerProperties)

app.post('/getPropertyResult', getPropertyResult)

app.post('/getMessage', getMessage)

app.post('/setMessage', setMessage)

app.listen(3001, function(){
  console.log("Listening at 3001");
})
