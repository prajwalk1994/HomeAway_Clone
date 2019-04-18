var kafka = require('../kafka/client');

exports.setMessage = function (req, resp) {
    console.log("Inside Set messages post request");
    console.log(req.body);
    kafka.make_request("set_message", req.body, (error, messages) => {
        if (error) {
            resp.writeHead(400, {
                "Content-type": "text/plain"
            })
            resp.end("Error setting messages in the DB");
        } else {
            resp.writeHead(200, {
                "Content-type": "application/json"
            })
            resp.end(JSON.stringify(messages));
            console.log("Successfully submitted messages to the DB");
        }
    })
}

exports.getMessage = function (req, resp) {
    console.log("Inside get messages post request");
    console.log(req.body);
    kafka.make_request("get_message", req.body, (error, messages) => {
        if (error) {
            resp.writeHead(400, {
                "Content-type": "text/plain"
            })
            resp.end("Error getting messages from the DB");
        } else {
            resp.writeHead(200, {
                "Content-type": "application/json"
            })
            resp.end(JSON.stringify(messages));
            console.log("Successfully retreived messages from DB");
        }
    })
}