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
    createTaskTemplate: createEnvelopesTemplate,
    setTaskListeners: setEnvelopesListeners
  };
}

function createEnvelopesTemplate() {
  return envelopesTemplate;
}

function setEnvelopesListeners() {
  const firstEnvelopeLengthInput = document.querySelector('#first-envelope-length');
  const firstEnvelopeWidthInput = document.querySelector('#first-envelope-width');
  const secondEnvelopeLengthInput = document.querySelector('#second-envelope-length');
  const secondEnvelopeWidthInput = document.querySelector('#second-envelope-width');
  const runButton = document.querySelector('.button-envelopes');

  runButton.addEventListener('click', () => {
    const firstEnvelope = {
      length: +firstEnvelopeLengthInput.value,
      width: +firstEnvelopeWidthInput.value
    };
    const secondEnvelope = {
      length: +secondEnvelopeLengthInput.value,
      width: +secondEnvelopeWidthInput.value
    };
    const result = isSmaller(firstEnvelope, secondEnvelope);
  });
}

function isSmaller(firstEnvelope, secondEnvelope) {
	const envelopesParagraphElem = document.querySelector('#envelopes-result');

  const firstCondition = Math.max(...Object.values(secondEnvelope)) < Math.max(...Object.values(firstEnvelope));
  const secondCondition = Math.min(...Object.values(secondEnvelope)) < Math.min(...Object.values(firstEnvelope));

  if (firstCondition && secondCondition) {

		envelopesParagraphElem.innerHTML = `<p>Status: successful</p>` + `<p>The second envelope can be placed in the first one</p>`;
		
		return;
  };

  envelopesParagraphElem.innerHTML = `<p>Status: failed</p>` + `<p>The second envelope cannot be placed in the first one</p>`;
}
