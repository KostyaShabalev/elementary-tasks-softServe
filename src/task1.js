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

function getChessboardObject() {

  return {
    name: 'chessboard',
    createTaskTemplate: getChessboardTemplate,
    setTaskListeners: setChessboardListeners
  };
}

function getChessboardTemplate() {

  return chessboardTemplate;
}

function setChessboardListeners() {
  const lengthInput = document.querySelector('#chessboard-length');
  const widthInput = document.querySelector('#chessboard-width');
  const symbolInput = document.querySelector('#chessboard-symbol');
  const runButton = document.querySelector('.button-chessboard');

  runButton.addEventListener('click', () => {
		const inputParams = [+lengthInput.value, +widthInput.value, symbolInput.value];
		implementChessboard(inputParams);
  });
}

function implementChessboard(inputParams) {
	const error = validateChessboardInputParameters(inputParams);

	if (!error) {
		showChessboardResult(buildChessboard(...inputParams));
	} else {
		showChessboardResult(error);
	}
}

function showChessboardResult(result) {
	const chessboardResultContainer = document.querySelector('#chessboard-result');
	
	if (result.status === 'failed') {
		chessboardResultContainer.innerHTML = `
			<p>Status: ${result.status}</p>
			<p>Reason: ${result.reason}</p>
		`;
	} else {
		chessboardResultContainer.innerHTML = `
			<p>Status: ${result.status}</p>
			<p>${result.template}</p>
		`;
	}
}

function validateChessboardInputParameters(params) {
	const haveAllArguments = validator.areAllArgumentsPassed(3, params);
	const isLengthValid = ( validator.isNaturalNumber(params[0]) );
	const isWidthValid = ( validator.isNaturalNumber(params[1]) );
	const isSymbolValid = ( (params[2].length !== 0) && validator.isString(params[2]) );
	let error = null;

	if ( !haveAllArguments ) {
		error = {
			status: 'failed',
			reason: 'function should recieve 3 paramenters'
		}

		return error;
	}

	if ( !isLengthValid || !isWidthValid || !isSymbolValid) {
		error = {
			status: 'failed',
			reason: 'one or more parameters are incorrect'
		}

		return error;
	}

	return error;
}

function buildChessboard(length, width, symb) {
  let chessboardResultTemplate = ``;

  for (let row = 1; row <= length; row++) {
    chessboardResultTemplate += `<p>`;

    for (let column = 1; column <= width; column++) {

      if ( (row % 2 !== 0 && column % 2 !== 0) || (row % 2 === 0 && column % 2 === 0)) {
        chessboardResultTemplate += symb;
      } else {
        chessboardResultTemplate += `&nbsp;`;
      }

      if (column === width) chessboardResultTemplate += `</p>`;
    }
	}
	
	return {
		status: 'successful',
		template: chessboardResultTemplate
	};
}