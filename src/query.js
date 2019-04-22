const query = (function () {
	const queryMethods = {};

	queryMethods.getElement = function (query) {
		
		return document.querySelector(query);
	};

	queryMethods.clearElement = function (query) {
		document.querySelector(query).innerHTML = '';
	}

	return queryMethods;
}());