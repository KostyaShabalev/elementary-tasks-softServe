const envelopesTemplate = `
  <h2>Task 2 - Envelopes Comparing</h2>
  <form class="form-envelopes">
    <div class="first-envelope">
      <h3>First envelope dimensions</h3>
      <label for="first-envelope-length">Length:</label>
      <input type="number" id="first-envelope-length">
      <label for="first-envelope-width">Width:</label>
      <input type="number" id="first-envelope-width">
    </div>
    <br>
    <div class="second-envelope">
      <h3>Second envelope dimensions</h3>
      <label for="second-envelope-length">Length:</label>
      <input type="number" id="second-envelope-length">
      <label for="second-envelope-width">Width:</label>
      <input type="number" id="second-envelope-width">
    </div>
    <br>
  </form>
  <div>
    <button class="button button-envelopes">Compare envelopes</button>
  </div>
  <div id="envelopes-result"></div>
`;

function getEnevelopesObject() {
  return {
    name: 'envelopes',
    createTaskTemplate: getEnvelopesTemplate,
    setTaskListeners: setEnvelopesListeners
  };
}

function getEnvelopesTemplate() {
  return envelopesTemplate;
}

function setEnvelopesListeners() {
  const firstEnvelopeLengthInput = document.querySelector('#first-envelope-length');
  const firstEnvelopeWidthInput = document.querySelector('#first-envelope-width');
  const secondEnvelopeLengthInput = document.querySelector('#second-envelope-length');
  const secondEnvelopeWidthInput = document.querySelector('#second-envelope-width');
  const runButton = document.querySelector('.button-envelopes');

  runButton.addEventListener('click', () => {
		const firstEnvelope = createEnvelope(+firstEnvelopeLengthInput.value, +firstEnvelopeWidthInput.value);
		const secondEnvelope = createEnvelope(+secondEnvelopeLengthInput.value, +secondEnvelopeWidthInput.value);

		compareEnvelopes(firstEnvelope, secondEnvelope);
  });
}

function compareEnvelopes(firstEnvelope, secondEnvelope) {
	const error = validateEnvelopesParameters(firstEnvelope, secondEnvelope);

	if (!error) {
		showResult(tryPutSecondIntoFirst(firstEnvelope, secondEnvelope));
	} else {
		showResult(error);
	}
}

function validateEnvelopesParameters(firstEnvelope, secondEnvelope) {
	const isFirstEnvelopeValid = (validator.isPositiveNumber(firstEnvelope.length));
	const isSecondEnvelopeValid = (validator.isPositiveNumber(secondEnvelope.length));
	let error = null;

	if ( !isFirstEnvelopeValid || !isSecondEnvelopeValid ) {
		error = {
			status: 'failed',
			reason: 'envelope deimensions should be positive numbers'
		};

		return error;
	}

	return error;
}

function tryPutSecondIntoFirst(firstEnvelope, secondEnvelope) {
	const firstEnvelopeParameters = Object.values(firstEnvelope);
	const secondEnvelopeParameters = Object.values(secondEnvelope);
  const isSecondEnvelopeMaxValueLower = Math.max(...secondEnvelopeParameters) < Math.max(...firstEnvelopeParameters);
  const isSecondEnvelopeMinValueLower = Math.min(...secondEnvelopeParameters) < Math.min(...firstEnvelopeParameters);

  if ( isSecondEnvelopeMaxValueLower && isSecondEnvelopeMinValueLower ) {

		return {
			status: 'successful',
			answer: 'The second envelope can be placed into the first one'
		};
	}

	return {
		status: 'successful',
		answer: 'But! The second envelope cannot be placed into the first one'
	};
}

function showResult(result) {
	const envelopesResultContainer = document.querySelector('#envelopes-result');

	if (result.status === 'failed') {
		envelopesResultContainer.innerHTML = `
			<p>Status: ${result.status}</p>
			<p>Reason: ${result.reason}</p>
		`;
	} else {
		envelopesResultContainer.innerHTML = `
			<p>Status: ${result.status}</p>
			<p>${result.answer}</p>
		`;
	}
}

function createEnvelope(lengthValue, widthValue) {
	return {
		length: lengthValue,
		width: widthValue
	};
}