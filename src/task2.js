const envelopesModule = (function () {
	let envelopes = {};
	const envelopesTemplate = `
		<h2>Task 2 - Envelopes Comparing</h2>
		<form class="form-envelopes">
			<div class="first-envelope">
				<h3>First envelope dimensions</h3>
				<label for="first-envelope-length">Length:</label>
				<input type="number" id="first-envelope-length" class="first-envelope-length">
				<label for="first-envelope-width">Width:</label>
				<input type="number" id="first-envelope-width" class="first-envelope-width">
			</div>
			<br>
			<div class="second-envelope">
				<h3>Second envelope dimensions</h3>
				<label for="second-envelope-length">Length:</label>
				<input type="number" id="second-envelope-length" class="second-envelope-length">
				<label for="second-envelope-width">Width:</label>
				<input type="number" id="second-envelope-width" class="second-envelope-width">
			</div>
			<br>
		</form>
		<button class="button button-run">Compare envelopes</button>
		<br>
		<div class="validation-error"></div>
		<br>
		<div class="result-container"></div>`;

	const messages = {
		invalidDimension: 'envelope\'s sides should be positive numbers',
		validationPassed: 'validation successfully passed',
		firstIsBigger: 'The first envelope CANNOT be placed into the second one',
		secondIsBigger: 'The first envelope can be placed into the second one',
		areEqual: 'Envelopes are equal'
	};
	let validationStatus = {};

	envelopes.name = 'envelopes';

	envelopes.createTaskTemplate = function () {

		return envelopesTemplate;
	}

	envelopes.setTaskListeners = function () {
		const runButton = query.getElement('.button-run');
		
		let inputElements = query.getSeveralElements(
				'.first-envelope-length',
				'.first-envelope-width',
				'.second-envelope-length',
				'.second-envelope-width');

		setInputListeners(inputElements);
		setRunButtonListener(runButton);
	}

	envelopes.validateDimension = function (event) {
		const value = +event.target.value;
		const isValid = validator.isPositiveNumber(value);

		return {
			isValid: isValid,
			status: (isValid) ? 'seccess' : 'failed',
			message: (isValid) ? messages.validationPassed : messages.invalidDimension
		};

		// if (isValid) {

		// 	return {
		// 		isValid: isValid,
		// 		status: 
		// 	};
		// }

		// const isFirstEnvelopeValid = (validator.isPositiveNumber(firstEnvelope.length));
		// const isSecondEnvelopeValid = (validator.isPositiveNumber(secondEnvelope.length));
		// let error = null;

		// if (!isFirstEnvelopeValid || !isSecondEnvelopeValid) {
		// 	error = {
		// 		status: 'failed',
		// 		reason: 'envelope deimensions should be positive numbers'
		// 	};

		// 	return error;
		// }

		// return error;
	}

	envelopes.createEnvelope = function (length, width) {

		return {
			length: length,
			width: width
		}
	}

	envelopes.compareEnvelopes = function (firstEnvelope, secondEnvelope) {
		const firstEnvelopeParameters = Object.values(firstEnvelope);
		const secondEnvelopeParameters = Object.values(secondEnvelope);
		const firstMaxSide = Math.max(...firstEnvelopeParameters);
		const firstMinSide = Math.min(...firstEnvelopeParameters);
		const secondMaxSide = Math.max(...secondEnvelopeParameters);
		const secondMinSide = Math.min(...secondEnvelopeParameters);

		if ( (firstMaxSide === secondMaxSide) && (firstMinSide === secondMinSide) ) {

			return messages.areEqual;
		}

		return ( (firstMaxSide < secondMaxSide) &&
								(firstMinSide < secondMinSide) ) ? messages.secondIsBigger : messages.firstIsBigger;
	}

	return envelopes;

	function setInputListeners(inputs) {
		const fields = ['firstLength', 'firstWidth', 'secondLength', 'secondWidth'];

		inputs.forEach( (element, index) => {

			element.addEventListener('blur', (event) => {
				let field = fields[index];
				validationStatus[field] = envelopes.validateDimension(event);

				if (validationStatus[field].isValid) {
					query.clearElement('.validation-error');
					query.clearElement('.result-container');
				} else {
					displayError(validationStatus[field]);
				}
			});
		} );
	}

	function setRunButtonListener(runButton) {
		runButton.addEventListener('click', () => {
			const parameters = Object.values(validationStatus);
			const invalidParameters = parameters.filter(status => {
				return !status.isValid;
			});

			if (invalidParameters.length === 0) {
				query.clearElement('.validation-error');
				runComparing();
			} else {
				displayError(invalidParameters[0]);
			}
		});
	}

	function runComparing() {
		const inputElements = query.getSeveralElements(
				'.first-envelope-length',
				'.first-envelope-width',
				'.second-envelope-length',
				'.second-envelope-width');
		const firstLength = +inputElements[0].value;
		const firstWidth = +inputElements[1].value;
		const secondLength = +inputElements[2].value;
		const secondWidth = +inputElements[3].value;
		let resultMessage = '';

		const firstEnvelope = envelopes.createEnvelope(firstLength, firstWidth);
		const secondEnvelope = envelopes.createEnvelope(secondLength, secondWidth);
		
		resultMessage = envelopes.compareEnvelopes(firstEnvelope, secondEnvelope);

		showResult(resultMessage);
	}

	function displayError(status) {
		const validationErrorContainer = query.getElement('.validation-error');

		validationErrorContainer.innerHTML = `<p>${status.message}</p>`;
	}

	function showResult(message) {
		let chessboardContainer = query.getElement('.result-container');

		chessboardContainer.innerHTML = `<p>${message}</p>`;
	}

}());