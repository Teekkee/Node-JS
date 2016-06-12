var md5 = require('md5');
var express = require('express');
var app = express();
var port = 4040;

app.use('/static/', express.static(__dirname + '/public/'));

app.use('/', function( request, response, next ) {
	response.sendFile(__dirname + '/static/md5.html');
	next();
});

app.all('/md5/:md5', function( request, response ) {
	response.json({ 'md5': md5(request.params.md5) });
});

app.listen(port, function () {
	console.log('Listening on ' + port);
});
