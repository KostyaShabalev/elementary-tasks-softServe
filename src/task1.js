const chessboardTemplate = `
  <h2>Task 1 - Chessboard Creating</h2>
  <form class="form-chess">
    <div>
      <label for="chessboard-length">Length:</label>
      <input type="number" id="chessboard-length">
    </div>
    <br>
    <div>
      <label for="chessboard-width">Width:</label>
      <input type="number" id="chessboard-width">
    </div>
    <br>
    <div>
      <label for="chessboard-symbol">Symbol:</label>
      <input type="text" id="chessboard-symbol">
    </div>
    <br>
  </form>
  <div>
    <button class="button button-chessboard">Create Chessboard</button>
  </div>
  <div id="chessboard-result"></div>
`;

const notEnoughParamsError = {
  status: 'failed',
  reason: 'function should recieve 3 paramenters'
};
const incorrectParamError = {
  status: 'failed',
  reason: 'one or more parameters are incorrect'
}

function getChessboardObject() {

  return {
    name: 'chessboard',
    createTaskTemplate: createChessboardTemplate,
    setTaskListeners: setChessboardListeners
  };
}

function createChessboardTemplate() {

  return chessboardTemplate;
}

function setChessboardListeners() {
  const lengthInputElem = document.querySelector('#chessboard-length');
  const widthInputElem = document.querySelector('#chessboard-width');
  const symbolInputElem = document.querySelector('#chessboard-symbol');
  const runButtonElem = document.querySelector('.button-chessboard');

  runButtonElem.addEventListener('click', () => {
    const chessboard = makeChessboard(+lengthInputElem.value, +widthInputElem.value, symbolInputElem.value);
  });
}

function makeChessboard(length, width, symb) {

  const chessboardParagraphElem = document.querySelector('#chessboard-result');
  let resultChessboardTemplate = ``;

  if ( arguments.length !== 3 ) {
    chessboardParagraphElem.innerHTML = `
    <p>Status: ${notEnoughParamsError.status}</p>
    <p>Reason: ${notEnoughParamsError.reason}</p>
    `;

    return;
  }

  if ( !isCorrectParam(length) || !isCorrectParam(width) || (typeof symb !== 'string' || symb.length === 0) ) {
    chessboardParagraphElem.innerHTML = `
      <p>Status: ${incorrectParamError.status}</p>
      <p>Reason: ${incorrectParamError.reason}</p>
    `;

    return;
  }

  for (let row = 1; row <= length; row++) {
    resultChessboardTemplate += `<p>`;

    for (let item = 1; item <= width; item++) {
      if (
        (row % 2 !== 0 && item % 2 !== 0) ||
        (row % 2 === 0 && item % 2 === 0)) {

        resultChessboardTemplate += symb;
      } else {
        resultChessboardTemplate += `&nbsp;`;
      }

      if (item === width) resultChessboardTemplate += `</p>`;
    }
  }

  chessboardParagraphElem.innerHTML = `<p>Status: successful</p>` + resultChessboardTemplate;
}

function isCorrectParam(param) {
  isNumber = typeof param === 'number';
  isNatural = (param > 0) && (Math.floor(param) === param);

  if (isNumber && isNatural) return true;
}