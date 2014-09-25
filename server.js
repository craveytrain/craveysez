var Path = require( 'path' );
var Hapi = require( 'hapi' );
var Good = require( 'good' );

// var redis = require( 'redis' );
// // Magic of linked docker containers makes the db host available
// var db = redis.createClient( 6379, 'db' );

// // Test function to verify redis is working
// db.on( 'ready', function () {
// 	db.set( 'foo_rand000000000000', 'some fantastic value', redis.print );
// 	db.get( 'foo_rand000000000000', redis.print );
// } );

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
