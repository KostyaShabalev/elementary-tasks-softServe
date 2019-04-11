
const selectTaskElem = document.querySelector('#task-select');
const buttonRunElem = document.querySelector('.run-task');
const divTaskElem = document.querySelector('.task-container');

const taskList = [
  getChessboardObject(),
  getEnevelopesObject()
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

  selectTaskElem.innerHTML = optionsTemplate;
}

function initHandlers() {
  buttonRunElem.addEventListener('click', () => {
    const currTask = taskList.find(task => task.name === selectTaskElem.value);
    divTaskElem.innerHTML = currTask.createTaskTemplate();
    currTask.setTaskListeners();
  });
}
