const chessboardTemplate = `
<h2>Task 1 - Chess Board</h2>
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

const paragraphChessboardEl = document.querySelector('#chessboard-result');
const notEnoughParamsError = {
    status: 'failed',
    reason: 'function should recieve 3 paramenters'
};
const incorrectParamError = {
    status: 'failed',
    reason: 'one or more parameters are incorrect'
}

function createChessboardTemplate() {
	return chessboardTemplate;
}

function setChessBoardListeners() {
    const inputLengthEl = document.querySelector('#chessboard-length');
    const inputWidthEl = document.querySelector('#chessboard-width');
    const inputSymbolEl = document.querySelector('#chessboard-symbol');

    document.querySelector('.button-chessboard').addEventListener('click', () => {
        const chessboard = makeChessBoard(+inputLengthEl.value, +inputWidthEl.value, inputSymbolEl.value);
        console.log(chessboard);
    });
}

function makeChessBoard(length, width, symb) {
    if ( arguments.length !== 3 ) {
        paragraphChessboardEl.innerHTML = `
            <p>Status: ${notEnoughParamsError.status}</p>
            <p>Reason: ${notEnoughParamsError.reason}</p>
        `;

        return;
    }

    if (
        (typeof length !== 'number' || length <= 0) ||
        (typeof width !== 'number' || width <= 0) ||
        typeof symb !== 'string') {

            paragraphChessboardEl.innerHTML = `
                <p>Status: ${incorrectParamError.status}</p>
                <p>Reason: ${incorrectParamError.reason}</p>
                `;

            return;
    }

    let resultChessboardTemplate = ``;

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
        paragraphChessboardEl.innerHTML = `
            <p>Status: successful</p>
        ` + resultChessboardTemplate;
}