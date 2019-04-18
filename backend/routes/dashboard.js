var kafka = require('../kafka/client');

exports.retrieveOwnerProperties = function (req, resp) {
    console.log("Inside retrieveOwnerProperties Post request");
    kafka.make_request("retrieve_owner_properties", req.body, (error, results) => {
        if (error) {
            resp.writeHead(400, {
                'Content-type': 'text/plain'
            })
            resp.end("Error retreiving property details");
        } else {
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            })
            resp.end(JSON.stringify(results));
            console.log("Successfully retrieved details requested");
        }
    })

}

exports.retrieveTravellerProperties = function (req, resp) {
    console.log("Inside retrieveTravellerProperties POST request");
    kafka.make_request("retrieve_traveller_properties", req.body, (error, results) => {
        if (error) {
            resp.writeHead(400, {
                'Content-type': 'text/plain'
            })
            resp.end("Error retreiving property details");
        } else {
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            })
            resp.end(JSON.stringify(results));
            console.log("Successfully retrieved details requested");
        }
    })

}