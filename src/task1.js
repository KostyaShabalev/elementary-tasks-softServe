const chessboardModule = (function () {
	let chessboard = {};
	const chessboardTemplate = `
		<h2>Task 1 - Chessboard Creating</h2>
		<form class="form-chess">
			<div>
				<label for="chessboard-length">Length:</label>
				<input type="number" id="chessboard-length" class="input input-length">
			</div>
			<br>
			<div>
				<label for="chessboard-width">Width:</label>
				<input type="number" id="chessboard-width" class="input input-width">
			</div>
			<br>
			<div>
				<label for="chessboard-symbol">Symbol:</label>
				<input type="text" id="chessboard-symbol" class="input input-symbol">
			</div>
			<br>
		</form>
		<button class="button button-run">Create Chessboard</button>
		<br>
		<div class="validation-error"></div>
		<br>
		<div class="result-container"></div>`;

	const errorMessages = {
		invalidLength: 'length should be natural number not greater than 10',
		invalidWidth: 'width should be natural number not greater than 50',
		invalidSymbol: 'enter a character'
	};
	let validationStatus = {};

	chessboard.name = 'chessboard';

	chessboard.createTaskTemplate = function () {

		return chessboardTemplate;
	};

	chessboard.setTaskListeners = function () {
		const runButton = query.getElement('.button-run');
		let lengthInput = query.getElement('.input-length');
		let widthInput = query.getElement('.input-width');
		let symbolInput = query.getElement('.input-symbol');

		lengthInput.addEventListener('blur', validateLength);
		widthInput.addEventListener('blur', validateWidth);
		symbolInput.addEventListener('blur', validateSymbol);
		runButton.addEventListener('click', runChessboardBuilding);
	};

	chessboard.getParameterValidationStatus = function (value, field) {
		const parameterValidationStatus = {};
		let isValid = false;

		switch (field) {
			case 'symbol':
				isValid = ( (value) && validator.isString(value) );
				parameterValidationStatus.message = (isValid) ? 'validation successfully passed' : errorMessages.invalidSymbol;
				break;

			case 'length':
				isValid = ( validator.isNaturalNumber(value) && (value < 11));
				parameterValidationStatus.message = (isValid) ? 'validation successfully passed' : errorMessages.invalidLength;
				break;

			case 'width':
				isValid = ( validator.isNaturalNumber(value) && (value < 51));
				parameterValidationStatus.message = (isValid) ? 'validation successfully passed' : errorMessages.invalidWidth;
		}

		parameterValidationStatus.isValid = isValid;
		parameterValidationStatus.status = (isValid) ? 'success' : 'failed';
		
		return parameterValidationStatus;
	}

	chessboard.buildChessboard = function (length, width, symbol) {
		let chessboardResultTemplate = ``;

		for (let row = 1; row <= length; row++) {
			chessboardResultTemplate += `<p>`;

			for (let column = 1; column <= width; column++) {

				if ((row % 2 !== 0 && column % 2 !== 0) || (row % 2 === 0 && column % 2 === 0)) {
					chessboardResultTemplate += symbol;
				} else {
					chessboardResultTemplate += `&nbsp;`;
				}

				if (column === width) chessboardResultTemplate += `</p>`;
			}
		}

		return chessboardResultTemplate;
	}

	return chessboard;

	function validateLength(event) {
		const field = 'length';
		const value = event.target.value;

		validationStatus.lengthInput = chessboard.getParameterValidationStatus(+value, field);

		if (validationStatus.lengthInput.isValid) {
			query.clearElement('.validation-error');
			query.clearElement('.result-container');
		} else {
			displayError(validationStatus.lengthInput);
		}
	}

	function validateWidth(event) {
		const field = 'width';
		const value = event.target.value;

		validationStatus.widthInput = chessboard.getParameterValidationStatus(+value, field);

		if (validationStatus.widthInput.isValid) {
			query.clearElement('.validation-error');
			query.clearElement('.result-container');
		} else {
			displayError(validationStatus.widthInput);
		}
	}

	function validateSymbol(event) {
		const field = 'symbol';
		const value = event.target.value;

		validationStatus.symbolInput = chessboard.getParameterValidationStatus(value, field);

		if (validationStatus.symbolInput.isValid) {
			query.clearElement('.validation-error');
			query.clearElement('.result-container');
		} else {
			displayError(validationStatus.symbolInput);
		}
	}

	function runChessboardBuilding() {
		const isInvalid = (!validationStatus.lengthInput.isValid ||
			!validationStatus.widthInput.isValid ||
			!validationStatus.symbolInput.isValid);

		if (!isInvalid) {
			const inputElements = query.getSeveralElements('.input-length', '.input-width', '.input-symbol');
			const length = inputElements[0].value;
			const width = inputElements[1].value;
			const symbol = inputElements[2].value;

			query.clearElement('.validation-error');
			query.clearElement('.result-container');

			const chessboardTemplate = chessboard.buildChessboard(+length, +width, symbol);

			showResult(chessboardTemplate);
		}
	}

	function displayError(status) {
		const validationErrorContainer = query.getElement('.validation-error');

		validationErrorContainer.innerHTML = `<p>${status.message}</p>`;
	}

	function showResult(template) {
		let chessboardContainer = query.getElement('.result-container');

		chessboardContainer.innerHTML = template;
	}
}());