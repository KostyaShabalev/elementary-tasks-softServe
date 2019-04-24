const fibonacciModule = (function() {
	const fibonacci = {};
	const fibonacciTemplate = `
		<h2>Task 7 - Fibonacci numbers</h2>
		<div class="fibonacci-container">
			<form class="form-fibonacci">
				<h3>Choose one of next restrictions on Fibonacci numbers:</h3>
				<div class="interval-container">
					<h4 class="title interval-title">Numbers interval</h4>
					<div class="interval-input">
						<label for="interval-from">From:</label>
						<input type="number" id="interval-from" class="input from-input">
						<label for="interval-from">To:</label>
						<input type="number" id="interval-from" class="input to-input">
					</div>
				</div>
				<div class="length-container">
					<h4 class="title length-title">Number length</h4>
					<div class="length-input" style="display: none;">
						<label for="length">Length:</label>
						<input type="number" id="length" class="input length-input">
					</div>
				</div>
			</form>
			<br>
			<button class="button button-calculate">Calculate</button>
			<br>
			<div class="validation-status"></div>
			<br>
			<div class="result-container"></div>
		</div>`;

	const validationStatus = {
		intervalFrom: {},
		intervalTo: {},
		numberLength: {}
	};
	const errorMessages = {
		invalidIntervalParameter: '',
		negativeInterval: '',
		invalidLengthParameter: ''
	};
	const inputValues = {};
	let restriction = 'interval';

	fibonacci.name = 'fibonacci';

	fibonacci.getTaskTemplate = function () {

		return fibonacciTemplate;
	};

	fibonacci.setTaskListeners = function () {
		const intervalRestrictionTitle = query.getElement('.interval-title');
		const intervalFromInput = query.getElement('.from-input');
		const intervalToInput = query.getElement('.to-input');
		const lengthRestrictionTitle = query.getElement('.length-title');
		const lengthInput = query.getElement('.length-input');
		const calculateButton = query.getElement('.button-calculate');

		setTitleListeners(intervalRestrictionTitle, lengthRestrictionTitle);
		setInputListeners(intervalFromInput, intervalToInput, lengthInput);
		// setCalculateListener(calculateButton);
	}

	return fibonacci;

	function setTitleListeners(intervalTitle, lengthTitle) {
		
		intervalTitle.addEventListener('click', () => {
			restriction = 'interval';
			switchRestrictionDisplay();
		});

		lengthTitle.addEventListener('click', () => {
			restriction = 'length';
			switchRestrictionDisplay();
		});
	}

	function switchRestrictionDisplay() {
		const intervalInputsContainer = query.getElement('.interval-input');
		const lengthInputContainer = query.getElement('.length-input');

		switch (restriction) {
			case 'interval':
				intervalInputsContainer.style.display = "block";
				lengthInputContainer.style.display = "none";
				break;
			case 'length':
				lengthInputContainer.style.display = "block";
				intervalInputsContainer.style.display = "none";
		}
	}

	function setInputListeners(fromInput, toInput, lengthInput) {
		fromInput.addEventListener('blur', (event) => {
			const field = 'from-input';
			const value = event.target.value;

			validationStatus.fromInput = validateValue(value, field);
			console.log(validationStatus.fromInput);
		});

		toInput.addEventListener('blur', (event) => {
			const field = 'to-input';
			const value = event.target.value;

			validationStatus.fromInput = validateValue(value, field);
			console.log(validationStatus.toInput);
		});

		lengthInput.addEventListener('blur', (event) => {
			const field = 'length-input';
			const value = event.target.value;

			validationStatus.fromInput = validateValue(value, field);
			console.log(validationStatus.lengthInput);
		});
	}

	function validateValue(value, field) {
		let valueValidationStatus = {};

		if ( field === 'from-input' || field === 'to-input' ) {
			valueValidationStatus = getIntervalValidationStatus(value, field);
		} else {
			valueValidationStatus = getLengthValidationStatus(value);
		}

		return valueValidationStatus;
	}

	function getIntervalValidationStatus(value, field) {
		const anotherValue = (field === 'from-input') ? query.getElement('.to-input').value : query.getElement('.from-input').value;
		const isCurrentValueValid = isIntervalValueValid(+value);
		const isAnotherValueValid = isIntervalValueValid(+anotherValue);
		let isIntervalPositive = false;
		let intervalValidationInfo = {};
		

		switch (field) {
			case 'from-input':
				// const intervalToValue = query.getElement('.to-input').value;
				// isCurrentValueValid = ( validator.isNaturalNumber(+value) && isIntervalPositive );
				isIntervalPositive = +value < +anotherValue;
				break;
			case 'to-input':
				// const intervalFromValue = query.getElement('.from-input').value;
				// isCurrentValueValid = ( validator.isNaturalNumber(+value) && isIntervalPositive );
				isIntervalPositive = +value > +anotherValue;
		}

		intervalValidationInfo = getIntervalValidationInfo(isCurrentValueValid, isIntervalPositive, isAnotherInputEmpty);

		return intervalValidationInfo;
	}

	function isIntervalValueValid(valid) {

	}

	function getIntervalValidationInfo(isCurrentValueValid, isIntervalPositive, isAnotherInputEmpty) {
		const validationInfo = {};

		validationInfo.valid = ( isCurrentValueValid && isIntervalPositive );
		validationInfo.status = ( isCurrentValueValid && isIntervalPositive ) ? 'success' : 'failed';

		if (validationInfo.valid) {
			validationInfo.message = 'validation successfully passed';

			return validationInfo;
		}

		if (!isCurrentValueValid) {
			validationInfo.message = errorMessages.invalidIntervalParameter;

			return validationInfo;
		} else {
			validationInfo.message = errorMessages.negativeInterval;

			return validationInfo;
		}
	}

	function getLengthValidationStatus(value) {
		const lengthValidationStatus = {};
		const isValueValid = validator.isNaturalNumber(+value);;

		lengthValidationStatus.valid = isValueValid;
		lengthValidationStatus.status = (isValueValid) ? 'success' : 'failed';
		lengthValidationStatus.message = (isValueValid) ? 'validation successfully passed' : errorMessages.invalidLengthParameter;

		return lengthValidationStatus;
	}

	// function setCalculateListener(calculateButton) {
	// 	calculateButton.addEventListener('click', () => {
	// 		const isValidationPassed = checkValidationStatus();

	// 		if (isValidationPassed) {
	// 			query.clearElement('.validation-status');
	// 			startSquaresCalculation(inputValues);
	// 		}
	// 	});
	// }

	// function checkValidationStatus() {
	// 	return ( validationStatus.sequenceLength.valid && validationStatus.minSquare.valid );
	// }

	// function displayValidationStatus(status) {
	// 	const statusContainer = query.getElement('.validation-status');
	// 	const statusContent = `
	// 		<p>Status: ${status.status}</p>
	// 		<p>${status.message}</p>`;
		
	// 	statusContainer.innerHTML = statusContent;
	// }

	// function startSquaresCalculation(inputValues) {
	// 	const minSquare = inputValues.minSquare;
	// 	const sequenceLength = inputValues.sequenceLength;
	// 	const minGreaterIntegerRoot = findMinIntegerRoot(minSquare);

	// 	console.log(minIntegerRoot);
	// }

	// function findMinIntegerRoot(minSquare) {
	// 	const minRoot = Math.sqrt(minSquare);

	// 	return Math.ceil(minRoot);
	// }

}());