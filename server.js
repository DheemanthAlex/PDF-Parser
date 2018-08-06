var app = require('./app');
var port = 8081;

app.listen(port, function () {
	console.log("Server started at port: " + port);
});