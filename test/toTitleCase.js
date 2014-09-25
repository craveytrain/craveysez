var assert = require( 'assert' );

var toTitleCase = require( '../lib/toTitleCase' );

describe( 'toTitleCase()', function () {
	it( 'should capitalize first letter', function () {
		assert.equal( toTitleCase( 'letter' ), 'Letter' );
	} );

	it( 'should capitalize after spaces', function () {
		assert.equal( toTitleCase( 'first word' ), 'First Word' );
	} );
} );
