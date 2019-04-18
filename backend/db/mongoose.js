
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admincmpe273@ds241133.mlab.com:41133/homeawaydb',{poolSize: 100,useNewUrlParser: true, useCreateIndex: true});

var conn = mongoose.connection;
conn.on('error', ()=>{console.error('Connection Error')});
conn.on('open', ()=>{console.log("Connected")});

module.exports = { mongoose };