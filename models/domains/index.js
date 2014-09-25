var fs = require( 'fs' );
var path = require( 'path' );

var cache = {};
// Get {{member}} syntax
var re_submodel = new RegExp( /\{\{(\w+)\}\}/ );

function isSubModel( member ) {
	return re_submodel.test( member );
}

function getMemberName( member ) {
	// return either the regex derived goodness or the passed in value
	if ( isSubModel( member ) ) {
		return re_submodel.exec( member )[ 1 ]
	} else {
		return member;
	}
}

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
				var memberName = getMemberName( member );

				// throw if all the data isn't there
				if ( !initialData[ memberName ] ) throw new Error( 'Missing initial ' + memberName + ' data' );

				// if it's a submodel, format it differently
				if ( isSubModel( member ) ) {
					model[ memberName ] = '{{' + initialData[ memberName ] + '}}';
				} else {
					model[ memberName ] = initialData[ memberName ];
				}
			} );

			cache[ model.id ] = model;

			return model;
		},

		// get by id
		get: function ( id ) {
			var result = cache[ id ];

			if ( !result ) throw new Error( modelName + ' not found' );

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
