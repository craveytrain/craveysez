var assert = require( 'assert' );
var models = require( '../models/domains' );
var merge = require( 'merge' );
var stubModels = require( '../data/domains' );

// To make pretty titles
function toTitleCase( str ) {
	return str.replace( /\w\S*/g, function ( txt ) {
		return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase();
	} );
}

// Hard code values we know will be transformed by the domain models
var expectedModels = {
	review: {
		eatery: '{{eatery:e23423}}',
	}
};

// For each domain model type
Object.keys( models ).forEach( function ( modelName ) {
	// Give it a pretty name
	describe( toTitleCase( modelName ), function () {
		describe( 'create()', function () {
			it( 'should fail if data is missing in creation', function () {
				// Catch the throw that comes from missing data
				assert.throws(
					function () {
						models[ modelName ].create( {
							id: 'test'
						} );
					},
					Error
				);
			} );
		} );

		describe( 'get()', function () {
			it( 'should fail if coupon has not been created', function () {
				// catch the throw from missing coupon
				assert.throws(
					function () {
						models[ modelName ].get( 'test' );
					},
					Error
				);
			} );

			it( 'should create and get the same coupon', function () {
				// create the model
				models[ modelName ].create( stubModels[ modelName ] );

				// merge the original data and the transformed data
				var expectedModel = merge( stubModels[ modelName ], expectedModels[ modelName ] );

				// check for equality
				assert.deepEqual( models[ modelName ].get( stubModels[ modelName ].id ), expectedModel );
			} );

		} );
	} );
} );
