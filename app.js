var Path = require('path');
var Hapi = require('hapi');
var Good = require('good');

// Grab all the models recursively
var models = require('./models');

var hotspot = models.eatery.create('e23423','Hot New Spot', [23.234234234, -32.234234234], '301 Congress Ave, Austin, TX, 78701');
var myreview = models.review.create('r2342342', 'Good Eats', 'e23423', new Date());


console.log(models.eatery.get('e23423'));
console.log(models.review.get('r2342342'));

var serverOptions = {
	views: {
		engines: {
			jade: require('jade')
		},

		path: Path.join(__dirname, 'templates')
	}
};

var server = new Hapi.Server(3000, serverOptions);

server.route({
	method: 'GET',
	path: '/',
	handler: {
		view: 'index'
	}
});

server.pack.register(Good, function(err) {
	if (err) throw err; // didn't load plugin

	server.start(function() {
		console.log('info', 'Server running at:', server.info.uri);
	});
});
