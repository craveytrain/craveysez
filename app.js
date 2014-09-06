var Path = require('path');
var Hapi = require('hapi');
var Good = require('good');

// Grab all the models recursively
var models = require('./models');

// Begin Model Test
var hotspot = models.eatery.create({
	id: 'e23423',
	name: 'Hot New Spot',
	location: [23.234234234, -32.234234234],
	address: '301 Congress Ave, Austin, TX, 78701'
});
var myreview = models.review.create({
	id: 'r2342342',
	title: 'Good Eats',
	eatery: 'e23423',
	timestamp: new Date(),
	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
});
console.log(models.eatery.get('e23423'));
console.log(models.review.get('r2342342'));
// End Model Test

var serverOptions = {
	views: {
		engines: {
			jade: require('jade')
		},

		path: Path.join(__dirname, 'templates')
	}
};

var server = new Hapi.Server(80, serverOptions);

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
