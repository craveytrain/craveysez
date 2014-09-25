var fs = require( 'fs' );
var path = require( 'path' );

// Reduce can start with an object more easily
var domains = fs.readdirSync( __dirname ).reduce( function ( obj, dataFile ) {
	var domain = path.basename( dataFile, '.js' );

	// if it's not index, do yo thing
	if ( domain !== 'index' ) obj[ domain ] = require( './' + dataFile );

	return obj;
}, {} );

module.exports = domains;
