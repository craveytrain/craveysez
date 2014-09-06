var cache = {};

function create(id, name, location, address) {
	// create the model
	var obj = {
		id: id,
		name: name,
		location: location,
		address: address
	};

	// cache it for later
	cache[id] = obj;

	return obj;
}

function get(id) {
	return cache[id];
}

module.exports = {
	create: create,
	get: get
};
