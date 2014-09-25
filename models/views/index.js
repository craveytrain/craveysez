var fs = require( 'fs' );
var path = require( 'path' );
var domains = require( '../domains' );

var cache = {};
// Get {{member}} syntax
// var re_submodel = new RegExp( /\{\{(\w:+)\}\}/ );

// function isSubModel( member ) {
// 	return re_submodel.test( member );
// }

// function getMemberName( member ) {
// 	// return either the regex derived goodness or the passed in value
// 	if ( isSubModel( member ) ) {
// 		return re_submodel.exec( member )[ 1 ]
// 	} else {
// 		return member;
// 	}
// }

// function getKeySegments( key ) {
// 	// set order of key for view
// 	var keyOrder = [ null, 'id' ];

// 	// get cute with reduce, cause it builds the object automatically
// 	return key.split( ';' ).reduce( function ( obj, segment, i ) {
// 		var keyName;
// 		// if keyOrder is null, throw it away
// 		// get cute for caching (assigning the keyName var in the if conditional)
// 		if ( !( keyName = keyOrder[ i ] ) ) return obj;

// 		obj[ keyName ] = segment;

// 		return obj;
// 	}, {} );
// }

function initialize( modelName ) {
	// Grab the file
	var modelData = require( './' + modelName );

	var base = {
		// Set the create prototype
		create: function ( id ) {
			// iterate over the members with some reduce cuteness
			var model = Object.keys( modelData ).reduce( function ( obj, member ) {
				// grab it and set it
				obj[ member ] = domains[ member ].get( id );

				// gotta return the object or the data doesn't build
				return obj;
			}, {} );

			cache[ id ] = model;

			return model;
		},

		// get by id
		get: function ( id ) {
			// return it from cache or create a new one and return it
			return cache[ id ] || this.create( id );
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
