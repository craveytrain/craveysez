var assert = require( 'assert' );
var models = require( '../models' );

describe( 'Eatery', function () {

	var stubModel = {
		id: 'e23423',
		name: 'Hot New Spot',
		location: [ 23.234234234, -32.234234234 ],
		address: '301 Congress Ave, Austin, TX, 78701'
	};

	describe( 'create()', function () {
		it( 'should fail if data is missing in creation', function () {
			assert.throws(
				function () {
					models.eatery.create( {
						id: 'test'
					} );
				},
				Error
			);
		} );

		it( 'should create and get the same coupon', function () {
			models.eatery.create( stubModel );
			assert.deepEqual( models.eatery.get( stubModel.id ), stubModel );
		} );
	} );
} );;
