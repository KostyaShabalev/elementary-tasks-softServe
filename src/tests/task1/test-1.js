const getTaskTemplate = chessboardModule.getTaskTemplate;
const getParameterValidationStatus = chessboardModule.getParameterValidationStatus;
const buildChessboard = chessboardModule.buildChessboard;

const checkValidParameters = function (parameterArray, field) {
	const expectedResult = {
		isValid: true,
		status: 'success',
		message: 'validation successfully passed'
	};

	it('validation should be passed', function () {
		parameterArray.forEach(parameter => {
			assert.deepEqual(getParameterValidationStatus(parameter, field), expectedResult);
		});
	});
}

const checkInvalidParameters = function (parameterArray, field) {
	const successfullResult = {
		isValid: true,
		status: 'success',
		message: 'validation successfully passed'
	};
	
	it('validation should not be passed', function () {
		parameterArray.forEach(parameter => {
			assert.notDeepEqual(getParameterValidationStatus(parameter, field), successfullResult);
		});
	});
}

const checIfStringReturned = function (func, comment, args) {
	it(comment, function () {
		if (args) {
			assert.typeOf(func(...args), 'string');
		} else {
			assert.typeOf(func(), 'string');
		}
	});
}

const calcExpectedLength = function (args) {
	const cellsNumber = args[0] * args[1];
	const symbolsNumber = ( cellsNumber % 2 === 0 ) ? (cellsNumber / 2) : ( (cellsNumber - 1) / 2 + 1 );
	const spaceLength = 6;
	const tegLength = 7;
	const spacesNumber = cellsNumber - symbolsNumber;
	const technicalSymbolsNumber = ( args[0] * tegLength + spacesNumber * spaceLength );

	return symbolsNumber + technicalSymbolsNumber;
}

const checIfCorrectChessboardReturned = function (func) {

	let inputParameters = [0, 0, '*'];
	let expectedLength = 0;

	it('buildChessboard returns correct chessboard', function () {

		for (let length = 1; length <= 10; length++) {
			for (let width = 2; width <= 10; width++) {
				inputParameters[0] = length;
				inputParameters[1] = width;
				
				expectedLength = calcExpectedLength(inputParameters);
				assert.equal(func(...inputParameters).length, expectedLength);
			}
		}
	});
}

describe('Chessboard', function () {

	describe('testing "getTaskTemplate"', function () {
		const comment = 'createTemplate should return a string';
		checIfStringReturned(getTaskTemplate, comment);
	});

	describe('testing "getParameterValidationStatus"', function () {

		describe('length validation', function () {
			const field = 'length';
			const validLengths = [1, 5, 10];
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
		checIfStringReturned(buildChessboard, comment, inputParameters);

		checIfCorrectChessboardReturned(buildChessboard);
	});

});