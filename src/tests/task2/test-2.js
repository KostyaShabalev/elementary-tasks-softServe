const createTemplate = chessboardModule.createTaskTemplate;
const getParameterValidationStatus = chessboardModule.getParameterValidationStatus;
const buildChessboard = chessboardModule.buildChessboard;

const checkValidParameters = function (parameterArray, field) {
	it('validation should be passed', function () {
		parameterArray.forEach(parameter => {
			assert.equal(getParameterValidationStatus(parameter, field).isValid, true);
		});
	});
}

const checkInvalidParameters = function (parameterArray, field) {
	it('validation should not be passed', function () {
		parameterArray.forEach(parameter => {
			assert.equal(getParameterValidationStatus(parameter, field).isValid, false);
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

describe('Chessboard', function () {

	describe('testing "createTemplate"', function () {
		const comment = 'createTemplate should return a string';
		checIfStrinReturned(createTemplate, comment);
	});

	describe('testing "getParameterValidationStatus"', function () {

		describe('length validation', function () {
			const field = 'length';
			const validLengths = [1, 10];
			const invalidLengths = [-5, 0, 11];

			checkValidParameters(validLengths, field);
			checkInvalidParameters(invalidLengths, field);
		});

		describe('width validation', function () {
			const field = 'width';
			const validWidths = [1, 25, 50];
			const invalidWidths = [-5, 0, 51];

			checkValidParameters(validWidths, field);
			checkInvalidParameters(invalidWidths, field);
		});

		describe('symbol validation', function () {
			const field = 'symbol';
			const validSymbols = ['1', '*', 'gert3'];
			const invalidSymbols = [1, ''];

			checkValidParameters(validSymbols, field);
			checkInvalidParameters(invalidSymbols, field);
		});
	});

	describe('testing "buildChessboard"', function() {
		const inputParameters = [4, 4, '*'];

		const comment = 'buildChessboard should return a string';
		checIfStrinReturned(createTemplate, comment, inputParameters);
	});

});