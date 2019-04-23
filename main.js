
const selectTaskElement = document.querySelector('#task-select');
const buttonRunElement = document.querySelector('.run-task');
const taskContainerElement = document.querySelector('.task-container');

const taskList = [
  chessboardModule,
	envelopesModule,
	getTrianglesObject(),
	getPalindromeObject(),
	getTicketsObject(),
	squaresModule,
	fibonacciModule
];

init();

function init() {
  createOptions();
  initHandlers();
}

function createOptions() {

  let optionsTemplate = ``;

  taskList.forEach((task, number) => {
    let optionElemTemplate = `<option value=${task.name}>`;
    optionElemTemplate += `Task ${number + 1} - ${task.name}</option>`;
    optionsTemplate += optionElemTemplate;
  });

  selectTaskElement.innerHTML = optionsTemplate;
}

function initHandlers() {
  buttonRunElement.addEventListener('click', () => {
    const currTask = taskList.find(task => task.name === selectTaskElement.value);
    taskContainerElement.innerHTML = currTask.createTaskTemplate();
		currTask.setTaskListeners();
  });
}
