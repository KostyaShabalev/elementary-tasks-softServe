const query = (function () {
	const queryMethods = {};

	queryMethods.getElement = function (query) {
		
		return document.querySelector(query);
	};

	return queryMethods;
}());