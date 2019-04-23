const query = (function () {
	const queryMethods = {};

	queryMethods.getElement = function (query) {
		
		return document.querySelector(query);
	};

	queryMethods.getSeveralElements = function () {
		let elements = [];

		[].forEach.call(arguments, query => {
			elements.push(this.getElement(query));
		});

		return elements;
	}

	queryMethods.clearElement = function (query) {
		document.querySelector(query).innerHTML = '';
	}

	return queryMethods;
}());