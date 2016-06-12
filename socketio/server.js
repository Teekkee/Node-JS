var port = 5555;
var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

module.exports = (function() {
	function inner() {
		this.start = function(whatToDo) {
			app.use(express.static(__dirname + "/public"));
		
			app.get('/page', function(req,res) {
				res.send('<h1> Hellooo</h1>');
			});
			app.use('/', function(req,res) {
				res.redirect('/client.html');
			});
		
		io.on('connection', function (socket) {
			console.log('user connected');

			socket.broadcast.emit('chat message push', '>>user has been connected');
			
			socket.on('chat message', function(msg) {
				console.log('message:' + msg);
				socket.broadcast.emit('chat message push', msg);
				socket.emit('chat message push', '<a>me:</a>' + msg);
			});
			socket.on('disconnect', function() {
				console.log('user disconnected');
				socket.broadcast.emit('chat message push', '<< user has been disconnected');
			});
		});
	
			http.listen(process.env.port || port, function () {
				console.log(port);
			});
		};
	}
return new inner;
})();
