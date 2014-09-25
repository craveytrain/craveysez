var assert = require( 'assert' );
var models = require( '../models/views' );
var merge = require( 'merge' );
var toTitleCase = require( '../lib/toTitleCase' );

// Stub out some data and get the domain models
var domainModels = require( '../models/domains' );
var stubDomainData = require( '../data/domains' );
var stubData = require( '../data/views' );

var expectedModels = {
	eatery: {
		eatery: {
			id: 'eatery:23423',
			name: 'Hot New Spot',
			location: [ 23.234234234, -32.234234234 ],
			address: '301 Congress Ave, Austin, TX, 78701'
		}
	}
};

// For each domain model type
Object.keys( models ).forEach( function ( modelName ) {
	// Give it a pretty name
	describe( toTitleCase( modelName ), function () {
		describe( 'create()', function () {
			it( 'should fail if components have not been created', function () {
				// catch the throw from missing component
				assert.throws(
					function () {
						models[ modelName ].get( 'test' );
					},
					Error
				);
			} );
		} );

		describe( 'get()', function () {
			it( 'should create and get the same', function () {
				// loop through stub domains and build out models
				Object.keys( stubDomainData ).forEach( function ( domain ) {
					// create the model
					domainModels[ domain ].create( stubDomainData[ domain ] );
				} );

				// check for equality
				assert.deepEqual( models[ modelName ].get( stubData[ modelName ] ), expectedModels[ modelName ] );

			} );
		} );
	} );
} );
