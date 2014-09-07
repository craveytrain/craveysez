var assert = require( 'assert' );
var models = require( '../models' );

function toTitleCase( str ) {
	return str.replace( /\w\S*/g, function ( txt ) {
		return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase();
	} );
}

var stubModels = {
	eatery: {
		id: 'e23423',
		name: 'Hot New Spot',
		location: [ 23.234234234, -32.234234234 ],
		address: '301 Congress Ave, Austin, TX, 78701'
	},
	review: {
		id: 'r2342342',
		title: 'Good Eats',
		eatery: 'e23423',
		timestamp: new Date(),
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	}
};

Object.keys( models ).forEach( function ( modelName ) {
	describe( toTitleCase( modelName ), function () {
		describe( 'create()', function () {
			it( 'should fail if data is missing in creation', function () {
				assert.throws(
					function () {
						models[ modelName ].create( {
							id: 'test'
						} );
					},
					Error
				);
			} );

			it( 'should create and get the same coupon', function () {
				models[ modelName ].create( stubModels[ modelName ] );
				assert.deepEqual( models[ modelName ].get( stubModels[ modelName ].id ), stubModels[ modelName ] );
			} );
		} );

		describe( 'get()', function () {
			it( 'should fail if coupon has not been created', function () {
				assert.throws(
					function () {
						models[ modelName ].get( 'test' );
					},
					Error
				);
			} );
		} );
	} );
} );
