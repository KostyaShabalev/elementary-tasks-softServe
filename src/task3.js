const trianglesModule = (function () {
	let triangles = {}
	const trianglesTemplate = `
<h2>Task 3 - Triangles Sorting</h2>
<div class="triangles-container" style="display: flex;">
	<form class="form-triangles">
		<h3>New triangle</h3>
		<div class="new-triangle" style="display: flex; flex-direction: column;">
			<label for="vertices">Vertices:</label>
			<input type="text" id="vertices"><br><br>
			<label for="first-side">First side:</label>
			<input type="number" id="first-side"><br>
			<label for="second-side">Second side:</label>
			<input type="number" id="second-side"><br>
			<label for="third-side">Third side:</label>
			<input type="number" id="third-side">
		</div>
	</form>
	<div class="triangles-list-container" style="margin-left: 20px;">
		<h3>Triangles List</h3>
		<ol class="triangles-list"></ol>
	</div>
</div>
<br>
<div class="button-group">
	<button class="button button-add">Add triangle</button>
	<button class="button button-sort">Sort by square</button>
</div>
<br>
<div class="status-container"></div>`;

const trianglesList = [];
let trianglesListToRender = [];
let fromMinSort = true;

triangles.name = 'triangles';

triangles.getTaskTemplate = function () {

	return trianglesTemplate;
}

triangles.setTaskListeners = function () {
	const addButton = query.getElement('.button-add');
	const sortButton = query.getElement('.button-sort');
	
	addButton.addEventListener('click', () => {
		addTriangle();
		renderTrianglesList();
	});
	sortButton.addEventListener('click', () => {
		sortBySquares();
		renderTrianglesList();
	});
}

return triangles;

// function getTrianglesObject() {
//   return {
//     name: 'triangles',
//     createTaskTemplate: getTrianglesTemplate,
//     setTaskListeners: setTrianglesListeners
//   };
// }

// function getTrianglesTemplate() {

//   return trianglesTemplate;
// }

// function setTrianglesListeners() {
// 	const addButton = query.getElement('.button-add');
// 	const sortButton = query.getElement('.button-sort');
	
// 	addButton.addEventListener('click', () => {
// 		addTriangle();
// 		renderTrianglesList();
// 	});
// 	sortButton.addEventListener('click', () => {
// 		sortBySquares();
// 		renderTrianglesList();
// 	});
// }

function addTriangle() {
	const inputValues = getTriangleInputValues();
	let validationError = null;
	
	if (inputValues) {
		validationError = validateTriangleInputValues(inputValues);
	}

	if (!validationError) {
		trianglesList.push(createTriangle(inputValues));
		trianglesListToRender = trianglesList.slice();
		showTrianglesStatus();
	} else {
		showTrianglesStatus(validationError);
	}
}

function getTriangleInputValues() {
	const verticesInput = query.getElement('#vertices');
  const firstSideInput = query.getElement('#first-side');
	const secondSideInput = query.getElement('#second-side');
	const thirdSideInput = query.getElement('#third-side');

	if ( verticesInput.value && firstSideInput.value && secondSideInput.value && thirdSideInput.value) {

		return {
			vertices: verticesInput.value,
			firstSide: +firstSideInput.value,
			secondSide: +secondSideInput.value,
			thirdSide: +thirdSideInput.value
		};
	} else {

		return null;
	}
}

function validateTriangleInputValues(inputValues) {
	let typeError = null;
	let cannotCreateError = null;
	let isInListError = null;

	typeError = validateTriangleInputTypes(inputValues);
	cannotCreateError = validateTriangleSideLengths(inputValues);

	if ( !typeError && !cannotCreateError ) {
		isInListError = findVerticesInList(inputValues.vertices);
	}

	return ( typeError || cannotCreateError || isInListError || null);
}

function validateTriangleInputTypes(inputValues) {
	if ( !passTriangleNameValidation(inputValues.vertices) ) {

		return {
			status: 'failed',
			reason: 'vertices value should be a string and consist of 3 characters'
		};
	}

	if ( !passTriangleSidesValidation(inputValues) )  {

			return {
				status: 'failed',
				reason: 'sides values should be positive numbers'
			};
		}

		return null;
}

function passTriangleNameValidation(name) {
	const isString = validator.isString(name);
	const consistOfThreeCharacters = name.length === 3;
	const hasOnlyThreeCharacters = validator.meetsRegExpPattern(name, /^[a-zA-Z]+$/);

	return ( isString && consistOfThreeCharacters && hasOnlyThreeCharacters );
}

function passTriangleSidesValidation(inputValues) {
	
	return ( validator.isPositiveNumber(inputValues.firstSide) &&
					validator.isPositiveNumber(inputValues.secondSide) &&
					validator.isPositiveNumber(inputValues.thirdSide) );
}

function validateTriangleSideLengths(triangleValues) {
	const firstSide = triangleValues.firstSide;
	const secondSide = triangleValues.secondSide;
	const thirdSide = triangleValues.thirdSide;

	if ( !(firstSide < secondSide + thirdSide) || !(secondSide < firstSide + thirdSide) || !(thirdSide < firstSide + secondSide) ) {

		return {
			status: 'failed',
			reason: 'triangle with such sides cannot be created'
		};
	}

	return null;
}

function findVerticesInList(vertices) {
	const matchFound = trianglesList.find( item => {

		return item.vertices === vertices.toUpperCase();
	} );

	if (matchFound) {

		return {
			status: 'failed',
			reason: 'triangle with such vertices already exists'
		};
	}

	return null;
}

function createTriangle(triangleValues) {
	const triangleSquare = findTriangleSquareByHeron(triangleValues);

	triangleValues.vertices = triangleValues.vertices.toUpperCase();
	
	return {
		...triangleValues,
		square: triangleSquare
	};
}

function findTriangleSquareByHeron(triangleValues) {
	const firstSide = triangleValues.firstSide;
	const secondSide = triangleValues.secondSide;
	const thirdSide = triangleValues.thirdSide;
	const halfPerimeter = (firstSide + secondSide + thirdSide) / 2;
	const square = Math.sqrt( halfPerimeter * (halfPerimeter - firstSide) * (halfPerimeter - secondSide) * (halfPerimeter - thirdSide));

	return +square.toFixed(2);
}

function renderTrianglesList() {
	const trianglesListElement = query.getElement('.triangles-list');
	let trianglesListContent = ``;

	trianglesListToRender.forEach(triangle => {
		trianglesListContent += `<li>Triangle: ${triangle.vertices}, Square: ${triangle.square}</li>`;
	});

	trianglesListElement.innerHTML = trianglesListContent;
}

function showTrianglesStatus(error) {
	const taskStatusContainer = query.getElement('.status-container');

	if (error) {
		taskStatusContainer.innerHTML = `
			<p>Status: ${error.status}</p>
			<p>Reason: ${error.reason}</p>
		`;
	} else {
		taskStatusContainer.innerHTML = `
			<p>Status: successful</p>
			<p>Result: new triangle has been added</p>
		`;
	}
}

function sortBySquares() {
	if (fromMinSort) {
		trianglesListToRender.sort( (firstTriangle, secondTriangle) => firstTriangle.square - secondTriangle.square);
	} else {
		trianglesListToRender.sort( (firstTriangle, secondTriangle) => secondTriangle.square - firstTriangle.square);
	}

	fromMinSort = !fromMinSort;
}
}());
