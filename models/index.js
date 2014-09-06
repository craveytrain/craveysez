var fs = require( 'fs' );
var path = require( 'path' );

var cache = {};

function initialize( modelName ) {
	// Grab the file
	var modelData = require( './' + modelName );

	var base = {
		// Set the create prototype
		create: function ( initialData ) {
			// create the blank object
			var model = {};

			// populate with data from the initialization
			modelData.members.forEach( function ( member ) {
				// throw if all the data isn't there
				if ( !initialData[ member ] ) throw 'Missing initial ' + member + ' data';

				model[ member ] = initialData[ member ];
			} );

			cache[ model.id ] = model;

			return model;
		},

		// get by id
		get: function ( id ) {
			return cache[ id ];
		}
	};

	return base;
}

// Reduce can start with an object more easily
var models = fs.readdirSync( __dirname ).reduce( function ( obj, modelFile ) {
	var model = path.basename( modelFile, '.js' );

	// if it's index, cut out early
	if ( model === 'index' ) return obj;

	obj[ model ] = initialize( model );

	return obj;
}, {} );

module.exports = models;
