var models = {
	eatery: require('./eatery')
};

var cache = {};

function create(id, title, eatery, timestamp, text) {
	// create the model
	var obj = {
		id: id,
		title: title,
		eatery: eatery,
		timestamp: timestamp,
		text: text
	};

	// cache it for later
	cache[id] = obj;

	return obj;
}

function get(id) {
	var result = cache[id];

	// hydrate the eatery member
	result.eatery = models.eatery.get(result.eatery);

	return result;
}

module.exports = {
	create: create,
	get: get
};

