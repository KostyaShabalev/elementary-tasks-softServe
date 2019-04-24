const palindromeModule = (function () {
	let palindrome = {};
	const palindromeTemplate = `
	<h2>Task 4 - Palindrome</h2>
	<div class="palindrome-container" style="display: flex;">
		<form class="form-palindrome">
			<h3>Checking for palindrome</h3>
			<label for="number">Enter number:</label>
			<input type="number" id="number">
		</form>
		<div class="palindrome-list-container" style="margin-left: 20px;">
		<h3>Palindromes found:</h3>
		<ol class="palindrome-list"></ol>
		</div>
	</div>
	<br>
	<button class="button button-palindrome">Check</button>
	<br>
	<div class="status-container"></div>`;

let palindromesFound = [];

palindrome.name = 'palindrome';

palindrome.getTaskTemplate = function () {

	return palindromeTemplate;
};

palindrome.setTaskListeners = function () {
	const palindromeCheckButton = query.getElement('.button-palindrome');

	palindromeCheckButton.addEventListener('click', runPalindromeCheck);
}

return palindrome;

function setPalindromeListeners() {
	const palindromeCheckButton = query.getElement('.button-palindrome');

	palindromeCheckButton.addEventListener('click', runPalindromeCheck);
}

function runPalindromeCheck() {
	const valueToCheck = getPalindromeInputValues();
	let validationError = null;

	palindromesFound = [];
	validationError = passPalindromeInputValidation(valueToCheck);

	if (!validationError) {
		checkForPalindrom(Math.abs(valueToCheck));
		showPalindromeResult();
	} else {
		showPalindromeResult(validationError);
	}
}

function getPalindromeInputValues(value) {
	const valueInput = query.getElement('#number');

	return +valueInput.value;
}

function passPalindromeInputValidation(value) {
	if ( !Number.isInteger(value) || !(Math.abs(value) > 10) ) {

		return {
			status: 'failed',
			reason: 'input value should be an integer with absolute value greater than 10'
		};
	}

	return null;
}

function checkForPalindrom(number) {
	const arrayToCheck = ('' + number).split('');

	for (let itemsToCheck = 2; itemsToCheck <= arrayToCheck.length; itemsToCheck++) {
		arrayToCheck.forEach( (item, number, array) => {
			const areSoMuchItems = array[number + itemsToCheck - 1];

			if (areSoMuchItems) {
				findPalindrome(number, array, itemsToCheck);
			}
		} );
	}
}

function findPalindrome(number, array, itemsToCheck) {
	const arraySlice = array.slice(number, number + itemsToCheck);
	const isPalindrom = arraySlice.join('') === arraySlice.slice().reverse().join('')
	const isInArray = palindromesFound.indexOf(arraySlice.join('')) !== -1;

	if (isPalindrom && !isInArray) {
		palindromesFound.push(arraySlice.join(''));
	}
}

function showPalindromeResult(error) {
	const palindromeStatus = query.getElement('.status-container');
	const palindromeList = query.getElement('.palindrome-list');

	if (error) {
		palindromeStatus.innerHTML = `
			<p>Status: ${error.status}</p>
			<p>Reason: ${error.reason}</p>`;
			palindromeList.innerHTML = '';
	} else {

		if (palindromesFound.length > 0) {
			palindromeStatus.innerHTML = `<p>Status: success</p>`;
			renderPalindromes();
		} else {
			palindromeStatus.innerHTML = `
				<p>Status: done</p>
				<p>no palindrome was found</p>`;
				palindromeList.innerHTML = '';
		}
	}
	
}

function renderPalindromes() {
	const palindromeList = query.getElement('.palindrome-list');
	let palindromeItemsTemplate = ``;

	palindromesFound.forEach(item => {
		palindromeItemsTemplate += `<li>${item}</li>`;
	});

	palindromeList.innerHTML = palindromeItemsTemplate;
}
}());