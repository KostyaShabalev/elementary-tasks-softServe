const chessboardModule = (function () {
	let chessboard = {};
	const chessboardTemplate = `
		<h2>Task 1 - Chessboard Creating</h2>
		<form class="form-chess">
			<div style="width: 30%; display: flex; flex-direction: column;">
				<label for="chessboard-length">Length:</label>
				<input type="number" id="chessboard-length" class="input input-length"><br>
				<label for="chessboard-width">Width:</label>
				<input type="number" id="chessboard-width" class="input input-width"><br>
				<label for="chessboard-symbol">Symbol:</label>
				<input type="text" id="chessboard-symbol" class="input input-symbol"><br>
			</div>
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

	chessboard.getTaskTemplate = function () {

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
				parameterValidationStatus.message = (isValid) ?
					'validation successfully passed' : errorMessages.invalidSymbol;
				break;

			case 'length':
				isValid = ( validator.isNaturalNumber(value) && (value < 11));
				parameterValidationStatus.message = (isValid) ?
					'validation successfully passed' : errorMessages.invalidLength;
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

		handleValidationStatus(+value, field);
	}

	function validateWidth(event) {
		const field = 'width';
		const value = event.target.value;

		handleValidationStatus(+value, field);
	}

	function validateSymbol(event) {
		const field = 'symbol';
		const value = event.target.value;

		handleValidationStatus(value, field);
	}

	function handleValidationStatus(value, field) {
		validationStatus[field] = chessboard.getParameterValidationStatus(value, field);

		if (validationStatus[field].isValid) {
			clearInnerHtml(['.validation-error', '.result-container']);
		} else {
			clearInnerHtml(['.validation-error', '.result-container']);
			displayError(validationStatus[field]);
		}
	}

	function runChessboardBuilding() {
		const isInvalid = (!validationStatus.length.isValid ||
			!validationStatus.width.isValid ||
			!validationStatus.symbol.isValid);

		if (!isInvalid) {
			const inputElements = query.getSeveralElements('.input-length', '.input-width', '.input-symbol');
			const length = inputElements[0].value;
			const width = inputElements[1].value;
			const symbol = inputElements[2].value;

			clearInnerHtml(['.validation-error', '.result-container']);

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

	function clearInnerHtml(queries) {
		queries.forEach(element => {
			query.clearElement(element);
			query.clearElement(element);
		});
	}
}());