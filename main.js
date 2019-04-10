
const selectTaskEl = document.querySelector('#task-select');
const buttonRunEl = document.querySelector('.run-task');
const divTaskEl = document.querySelector('.task-container');

const taskList = [
    {
        name: 'chessboard',
        createTemplate: createChessboardTemplate,
        setTaskListeners: setChessBoardListeners
        // runTask: makeChessBoard
    }
];

init();

function init() {
    createOptions();
    initHandlers();
}

function createOptions() { // too many operations with DOM
    taskList.forEach((task, number) => {
        const optionEl = document.createElement('option');
        optionEl.value = task.name;
        optionEl.innerHTML = `Task ${number + 1} - ${task.name}`;
        selectTaskEl.appendChild(optionEl);
    });
}

function initHandlers() {
    buttonRunEl.addEventListener('click', () => {
        const currTask = taskList.find(task => task.name === selectTaskEl.value);
        renderTaskTemplate(currTask.createTemplate);
        addTaskListeners(currTask.setTaskListeners);
    });
}

function renderTaskTemplate(getTemplateFunc) {
    divTaskEl.innerHTML = getTemplateFunc();
}

function addTaskListeners(addTaskListenersFunc) {
    addTaskListenersFunc();
}


// const inputLengthEl = document.querySelector('#chessboard-length');
// const inputWidthEl = document.querySelector('#chessboard-width');
// const inputSymbolEl = document.querySelector('#chessboard-symbol');
// const paragraphChessboardEl = document.querySelector('#chessboard-result');
// const buttonShessboardEl = document.querySelector('.button-chess');

// let chessBoard = '';

// init();

// function init() {
//   clearInputs();
//   initChessBoardCreator();
// }

// function clearInputs() {
//   inputLengthEl.value = '';
//   inputWidthEl.value = '';
//   inputSymbolEl.value = '';
// }

// function initChessBoardCreator() {

//   buttonShessboardEl.addEventListener('click', () => {
//     chessBoard = makeChessBoard(+inputLengthEl.value, +inputWidthEl.value, inputSymbolEl.value);
//     console.log(chessBoard);
//     // paragraphChessboardEl.innerHTML = chessBoard;
//   });
// }