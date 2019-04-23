const squaresModule = (function () {
	const squares = {};
	const squaresTemplate = `
	<h2>Task 6 - Squares of numbers</h2>
	<div class="squares-container">
		<form class="form-squares">
				<div class="squares-inputs">
					<label for="sequence-length">Sequence length:</label>
					<input type="number" id="sequence-length" class="input input-sequence" required>
					<label for="min-square">Min square:</label>
					<input type="number" id="min-square" class="input input-min" required>
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
		sequenceLength: {},
		minSquare: {}
	};
	const inputValues = {};

	squares.name = 'sqaures';

	squares.createTaskTemplate = function () {

		return squaresTemplate;
	};

	squares.setTaskListeners = function () {
		const sequenceLengthInput = query.getElement('.input-sequence');
		const minSquareInput = query.getElement('.input-min');
		const calculateButton = query.getElement('.button-calculate');

		setSequenceLengthListener(sequenceLengthInput);
		setMinSquareListener(minSquareInput);
		setCalculateListener(calculateButton);
	}

	return squares;

	function setSequenceLengthListener(inputElement) {
		inputElement.addEventListener('blur', (event) => {
			const field = 'sequence-length';
			const value = +event.target.value;
			validationStatus.sequenceLength = validateValue(field, value);

			if (validationStatus.sequenceLength.valid) {
				inputValues.sequenceLength = value;
				query.clearElement('.validation-status');
			} else {
				displayValidationStatus(validationStatus.sequenceLength);
			}
		});
	}

	function setMinSquareListener(inputElement) {
		inputElement.addEventListener('blur', (event) => {
			const field = 'min-square';
			const value = +event.target.value;
			validationStatus.minSquare = validateValue(field, value);

			if (validationStatus.minSquare.valid) {
				inputValues.minSquare = value;
				query.clearElement('.validation-status');
			} else {
				displayValidationStatus(validationStatus.minSquare);
			}
		});
	}

	function validateValue(field, value) {
		let isValid = false;

		switch (field) {
			case 'sequence-length':
				isValid = validator.isNaturalNumber(value);
				break;
			case 'min-square':
				isValid = validator.isPositiveNumber(value);
		}

		return generateStatusInfo(field, isValid);
	}

	function generateStatusInfo(field, isValid) {
		const statusInfo = {};

		statusInfo.valid = isValid;
		statusInfo.status = (isValid) ? 'success' : 'failed';

		switch (field) {
			case 'sequence-length':
				statusInfo.message = (isValid) ? 'validation passed' : 'sequence length should be a natural number (non-negative integer)';
				break;
			case 'min-square':
				statusInfo.message = (isValid) ? 'validation passed' : 'square value should be positive number';
		}

		return statusInfo;
	}

	function setCalculateListener(calculateButton) {
		calculateButton.addEventListener('click', () => {
			const isValidationPassed = checkValidationStatus();

			if (isValidationPassed) {
				query.clearElement('.validation-status');
				startSquaresCalculation(inputValues);
			}
		});
	}

	function checkValidationStatus() {
		return ( validationStatus.sequenceLength.valid && validationStatus.minSquare.valid );
	}

	function displayValidationStatus(status) {
		const statusContainer = query.getElement('.validation-status');
		const statusContent = `
			<p>Status: ${status.status}</p>
			<p>${status.message}</p>`;
		
		statusContainer.innerHTML = statusContent;
	}

	function startSquaresCalculation(inputValues) {
		const minSquare = inputValues.minSquare;
		const sequenceLength = inputValues.sequenceLength;
		const minGreaterIntegerRoot = findMinIntegerRoot(minSquare);

		console.log(minIntegerRoot);
	}

	function findMinIntegerRoot(minSquare) {
		const minRoot = Math.sqrt(minSquare);

		return Math.ceil(minRoot);
	}

}());