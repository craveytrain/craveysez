var Path = require( 'path' );
var Hapi = require( 'hapi' );
var Good = require( 'good' );

// Grab all the models recursively
// var models = require( './models' );

var serverOptions = {
	views: {
		engines: {
			jade: require( 'jade' )
		},

		path: Path.join( __dirname, 'templates' )
	}
};

var server = new Hapi.Server( 80, serverOptions );

server.route( {
	method: 'GET',
	path: '/',
	handler: {
		view: 'index'
	}
} );

server.pack.register( Good, function ( err ) {
	if ( err ) throw err; // didn't load plugin

	server.start( function () {
		console.log( 'info', 'Server running at:', server.info.uri );
	} );
} );
