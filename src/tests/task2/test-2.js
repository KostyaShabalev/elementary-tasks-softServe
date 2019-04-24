const getTaskTemplate = envelopesModule.getTaskTemplate;
const getValidationStatus = envelopesModule.getValidationStatus;
const createEnvelope = envelopesModule.createEnvelope;
const compareEnvelopes = envelopesModule.compareEnvelopes;

const checkValidParameters = function (validValues) {
	it('validation should be passed', function () {
		const expectedResult = {
			isValid: true,
			status: 'success',
			message: 'validation successfully passed'
		};

		validValues.forEach(value => {
			let pseudoEvent = {
				target: {value: [value]}
			};
			assert.deepEqual(getValidationStatus(pseudoEvent), expectedResult);
		});
	});

}

const checkinvalidParameters = function (invalidValues) {
	it('validation should not be passed', function () {
		const expectedResult = {
			isValid: false,
			status: 'failed',
			message: 'envelope\'s sides should be positive numbers'
		};

		invalidValues.forEach(value => {
			let pseudoEvent = {
				target: {value: [value]}
			};
			assert.deepEqual(getValidationStatus(pseudoEvent), expectedResult);
		});
	});

}

const checIfStrinReturned = function (func, comment, args) {
	it(comment, function () {
		if (args) {
			assert.typeOf(func(...args), 'string');
		} else {
			assert.typeOf(func(), 'string');
		}
	});
}

const secondFitsInto = function () {
	const firstEnvelope = {
		length: 4,
		width: 6
	};
	const secondEnvelope = {
		length: 3,
		width: 5
	};
	const expectedMessage = 'The first envelope CANNOT be placed into the second one';

	checkIfComparisonSuccessful(firstEnvelope, secondEnvelope, expectedMessage);
}

const secondNotFitsInto = function () {
	const firstEnvelope = {
		length: 4,
		width: 4.9
	};
	const secondEnvelope = {
		length: 5,
		width: 5
	};
	const expectedMessage = 'The first envelope can be placed into the second one';

	checkIfComparisonSuccessful(firstEnvelope, secondEnvelope, expectedMessage);
}

const bothAreEqual = function () {
	const firstEnvelope = {
		length: 5,
		width: 5
	};
	const secondEnvelope = {
		length: 5,
		width: 5
	};
	const expectedMessage = 'Envelopes are equal';

	checkIfComparisonSuccessful(firstEnvelope, secondEnvelope, expectedMessage);
}

const checkIfComparisonSuccessful = function (firstEnvelope, secondEnvelope, expectedMessage) {
	it('comparison returns correct result', function () {
		assert.equal(compareEnvelopes(firstEnvelope, secondEnvelope), expectedMessage);
	});
}

describe('Envelopes', function () {

	describe('testing "getTaskTemplate"', function () {
		const comment = 'createTemplate should return a string';
		checIfStrinReturned(getTaskTemplate, comment);
	});

	describe('testing "getValidationStatus"', function () {
		const validValues = [1, 2.5];
		const invalidValues = [-5, 0];

		checkValidParameters(validValues);
		checkinvalidParameters(invalidValues);
	});

	describe('testing "createEnvelope"', function() {
		const expectedResult = {
			length: 10,
			width: 20
		};

		it('correct envelope should be created', function () {
			assert.deepEqual(createEnvelope(10, 20), expectedResult);
		});
	});

	describe('testing "compareEnvelopes"', function () {
		secondFitsInto();
		secondNotFitsInto();
		bothAreEqual();
	});

});