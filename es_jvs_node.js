var apiai = require('apiai');

var app = apiai("8b95d7fdfe574e6786e9642bdd793f37");

const uuidv3 = require('uuid/v3');

var options = {
	sessionId: uuidv3('https://health4theworld.org/', uuidv3.DNS)
};

var request = app.textRequest(query, options);

request.on('response', function(response) {
	console.log(response);
});

request.on('error', function(error) {
	console.log(error);
});
 
request.end();