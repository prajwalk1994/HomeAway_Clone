var kafka = require('../kafka/client');

exports.getProperties = function (req, resp) {
    console.log(req.body);
    console.log("getting Property details based on search");
    kafka.make_request("get_properties", req.body, function (error, results) {
        if (error) {
            resp.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            resp.end("Couldnt fetch details from DB");
        }
        else {
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            })
            resp.end(JSON.stringify(results));
        }

    })
}

exports.bookProperty = function (req, resp) {
    console.log("Inside book property method");
    console.log(req.body);
    kafka.make_request("book_property", req.body, function (error, results) {
        if (error) {
            resp.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            resp.end("Couldnt book property for the traveller");
        }
        else {
            resp.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            resp.end("Property booked successfully");
        }
    })
}

exports.listProperty = function (req, resp) {
    console.log("Inside listProperty POST request");
    console.log(req.body);
    kafka.make_request("list_property", req.body, (error, results) => {
        if (error) {
            resp.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            resp.end("Error listing property in the database");
        } else {
            resp.writeHead(200, {
                'Content-type': 'application/json'
            })
            resp.end(JSON.stringify(results));
            console.log("Property succesfully listed in the website");
        }
    })
}

exports.getPropertyResult = function (req, resp) {
    console.log("Inside getPropertyResult Post request");
    console.log(req.body);
    kafka.make_request("get_property_result", req.body, (error, results) => {
        if (error) {
            resp.writeHead(400, {
                'Content-type': 'text/plain'
            })
            resp.end("Error retrieving property details");
        }
        else {
            resp.writeHead(200, {
                'Content-type': 'application/json'
            })
            resp.end(JSON.stringify(results));
            console.log("Retrieving property details \n exiting getPropertyResult");
        }
    })

}