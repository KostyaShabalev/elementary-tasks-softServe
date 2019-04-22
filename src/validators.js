const validator = (function () {
	const validatorMethods = {};

	validatorMethods.areAllArgumentsPassed = function (argumentsNeeded, args) {
		return (argumentsNeeded === args.length);
	}

	validatorMethods.isNaturalNumber = function (value) {
		return ( this.isNumber(value) && Number.isInteger(value) && (value > 0) );
	}

	validatorMethods.isNumber = function (value) {
		return !isNaN(value);
	}

	validatorMethods.isPositiveNumber = function (value) {
		return ( this.isNumber(value) && (value > 0) );
	}

	validatorMethods.isString = function (value) {
		return (typeof value === 'string');
	}

	validatorMethods.meetsRegExpPattern = function (string, pattern) {

		return pattern.test(string);
	}

	return validatorMethods;
}());