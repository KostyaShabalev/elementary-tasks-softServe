const ticketsModule = (function () {
	let tickets = {};
	const ticketsTemplate = `
	<h2>Task 5 - Lucky Tickets</h2>
	<div class="tickets-container">
		<form class="form-tickets">
			<h3>Choose interval for ticket numbers</h4>
				<div class="tickets-interval">
					<label for="interval-from">From:</label>
					<input type="number" id="interval-from" class="input input-from" required>
					<label for="interval-to">To:</label>
					<input type="number" id="interval-to" class="input input-to" required>
				</div>
		</form>
		<br>
		<button class="button button-calculate">Calculate</button>
		<br>
		<div class="validation-error"></div>
		<br>
		<div class="result-container"></div>
	</div>`;

const ticketsValidationStatus = {
	intervalFrom: {},
	intervalTo: {}
};

const ticketsInputElements = {};

tickets.name = 'tickets';

tickets.getTaskTemplate = function () {

	return ticketsTemplate;
};

tickets.setTaskListeners = function () {
	const ticketsCalculateButton = query.getElement('.button-calculate');

	ticketsInputElements.fromInput = query.getElement('.input-from');
	ticketsInputElements.toInput = query.getElement('.input-to');

	ticketsInputElements.fromInput.addEventListener('blur', (event) => {
		const inputType = 'from';

		ticketsValidationStatus.intervalFrom = validateTicketsInput(event, inputType);

		if (!ticketsValidationStatus.intervalFrom.valid) {
			showValidationErrorMessage(ticketsValidationStatus.intervalFrom);
		}
	});

	ticketsInputElements.toInput.addEventListener('blur', (event) => {
		const inputType = 'to';

		ticketsValidationStatus.intervalTo = validateTicketsInput(event, inputType);

		if (!ticketsValidationStatus.intervalTo.valid) {
			showValidationErrorMessage(ticketsValidationStatus.intervalTo);
		}
	});

	ticketsCalculateButton.addEventListener('click', () => {

		if ( ticketsValidationStatus.intervalFrom.valid && ticketsValidationStatus.intervalTo.valid ) {
			const intervalFromValue = +ticketsInputElements.fromInput.value;
			const intervalToValue = +ticketsInputElements.toInput.value;

			query.clearElement('.validation-error');
			const ticketsCalculationResult = runTicketsCalculation(intervalFromValue, intervalToValue);
			showTicketsResult(ticketsCalculationResult);
		}
	});
};

return tickets;

function validateTicketsInput(event, inputType) {
	const currValue = +event.target.value;
	const anotherValue = ( inputType === 'from') ? +ticketsInputElements.toInput.value : +ticketsInputElements.fromInput.value;
	const isCurrentValueCorrect = checkTicketsIntervalValue(+currValue);
	let isAnotherValueCorrect = checkTicketsIntervalValue(+anotherValue);
	let isFirstIntervalValueSmaller = false;
	let validationResult = {};

	if (!isCurrentValueCorrect) {
		validationResult = generateValidationResult('validation failed', 'non-valid');

		return validationResult;
	}

	isFirstIntervalValueSmaller = (isAnotherValueCorrect) ? compareAsNumbers(currValue, anotherValue, inputType) : false;

	if ( anotherValue && isAnotherValueCorrect && !isFirstIntervalValueSmaller ) {
		validationResult = generateValidationResult('validation failed', 'compare-error');

		return validationResult;
	}

	validationResult = generateValidationResult('succes');
	query.clearElement('.validation-error');

	return validationResult;
}

function compareAsNumbers(currValue, anotherValue, inputType) {

	switch (inputType) {
		case 'from':
			return (currValue < anotherValue);
		case 'to':
			return (anotherValue < currValue);
	}
}

function generateValidationResult(status, errorType) {
	if (!errorType) {
		
		return {
			valid: true,
			status: status,
			message: 'validation is passed'
		}
	}

	switch(errorType) {
		case 'non-valid':
			return {
				valid: false,
				status: status,
				message: 'interval values should be positive integers less than 1,000,000'
			}

		case 'compare-error':
			return {
				valid: false,
				status: status,
				message: 'the first interval value should be less than the second one'
			}
	}
}

function checkTicketsIntervalValue(value) {

	return (Number.isInteger(value) && (value > 0) && (value < 1000000));
}

function showValidationErrorMessage(taskStatus) {
	const statusContainer = query.getElement('.validation-error');
	const statusContent = `
		<p>Status: ${taskStatus.status}</p>
		<p>${taskStatus.message}</p>`;

		statusContainer.innerHTML = statusContent;
}

function runTicketsCalculation(intervalFromValue, intervalToValue) {

	let luckyByFirstMethodCounter = 0;
	let luckyBySecondMethodCounter = 0;

	for ( let ticketNumber = intervalFromValue; ticketNumber <= intervalToValue; ticketNumber++ ) {
		const ticketNumberAsArray = transformToArray(ticketNumber);

		const araBothHalvesEqual = compareTicketHalves(ticketNumberAsArray);
		const araOddsEqualsEvens = compareOddAndEven(ticketNumberAsArray);

		luckyByFirstMethodCounter = ( araBothHalvesEqual ) ? (luckyByFirstMethodCounter + 1) : (luckyByFirstMethodCounter + 0);
		luckyBySecondMethodCounter = ( araOddsEqualsEvens ) ? (luckyBySecondMethodCounter + 1) : (luckyBySecondMethodCounter + 0);
	}

	return {
		firstMethod: luckyByFirstMethodCounter,
		secondMethod: luckyBySecondMethodCounter
	};
}

function transformToArray(ticketNumber) {
	const ticketNumberAsString = transformToCertainDigitString(ticketNumber.toString(), 6);

	return ticketNumberAsString.split('');
}

function compareTicketHalves(array) {
	const firstHalf = array.slice(0, 3);
	const secondHalf = array.slice(3, 5);
	const sumOfFirstHalf = firstHalf.reduce( (a, b) => (+a) + (+b) );
	const sumOfSecondtHalf = secondHalf.reduce( (a, b) => (+a) + (+b) );

	return sumOfFirstHalf === sumOfSecondtHalf;
}

function compareOddAndEven(array) {
	const oddNumbers = [];
	const evenNumbers = [];
	let oddElementsSum = 0;
	let evenElementsSum = 0;

	array.forEach( (elem, index) => {
		const position = index + 1;

		(position % 2 === 0) ? evenNumbers.push(elem) : oddNumbers.push(elem);
	} );

	oddElementsSum = oddNumbers.reduce( (a, b) => (+a) + (+b) );
	evenElementsSum = evenNumbers.reduce( (a, b) => (+a) + (+b) );

	return oddElementsSum === evenElementsSum;
}

function transformToCertainDigitString(string, digitNumber) {
	const difference = digitNumber - string.length;
	const newString = '0'.repeat(difference) + string;

	return newString;
}

function showTicketsResult(result) {
	const resultContainer = query.getElement('.result-container');
	const resultContent = `
		<p>Number of lucky tickets found by the first method (the first half is equal to the second one ): ${result.firstMethod}</p>
		<p>Number of lucky tickets found by the second method (the sum of the odd elements is equal to the sum of the even ones): ${result.secondMethod}</p>`;
	
	resultContainer.innerHTML = resultContent;
}
}());