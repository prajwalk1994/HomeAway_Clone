var connection = new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var getProperties = require('./services/getProperties');
var bookProperty = require('./services/bookProperty');
var retrieveOwnerProperties = require('./services/retrieveOwnerProperties');
var retrieveTravellerProperties = require('./services/retrieveTravellerProperties');
var getPropertyResult = require('./services/getPropertyResult');
var listProperty = require('./services/listProperty');
var getMessage = require('./services/getMessage');
var setMessage = require('./services/setMessage');

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}


handleTopicRequest("get_property_result", getPropertyResult);
handleTopicRequest("get_properties",getProperties);
handleTopicRequest("book_property",bookProperty);
handleTopicRequest("retrieve_owner_properties",retrieveOwnerProperties);
handleTopicRequest("retrieve_traveller_properties", retrieveTravellerProperties);
handleTopicRequest("list_property", listProperty);
handleTopicRequest("set_message", setMessage);
handleTopicRequest("get_message", getMessage);