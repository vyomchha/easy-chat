/*const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
			
			var apiai = require('apiai');

			var app2 = apiai("8b95d7fdfe574e6786e9642bdd793f37");

			const uuidv3 = require('uuid/v3');

			var options = {
				sessionId: uuidv3('https://health4theworld.org/', uuidv3.DNS)
			};

			var request = app2.textRequest(result.query, options);
			var out;
			
			request.on('response', function(response) {
				console.log('p1',response);
				out = response['result']['fulfillment']['speech'];
				console.log('p2',out);
			});

			request.on('error', function(error) {
				out = error;
			});
			 
			request.end(out);
			res.end(out);
        });
    } 
    else {
        res.end();
    }
})
server.listen(3000);
console.log('Server started on port 3000')

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
app1.post('/ajaxcall', function(req, res) {
	var apiai = require('apiai');

	var app2 = apiai("8b95d7fdfe574e6786e9642bdd793f37");

	const uuidv3 = require('uuid/v3');

	var options = {
		sessionId: uuidv3('https://health4theworld.org/', uuidv3.DNS)
	};

	console.log(req.body.query);
	var request = app2.textRequest(req.body.query, options);
	var out;
	
	request.on('response', function(response) {
		out = response;
	});

	request.on('error', function(error) {
		out = error;
	});
	 
	request.end();
	res.send(out);
}*/

const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})