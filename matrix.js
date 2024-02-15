function generateMatrices() {
    clearErrorMessage();
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};


const showResult2D = (title, containerId, dataArray) => {
    // dataArray is a 2D array
    // Uses showResult as a base. 

    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < dataArray[i].length; j++) {
            let td = document.createElement('td');

            td.textContent = dataArray[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result;
    // Call your matrix calculation functions here
    // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
    // prints suitable messages for impossible situation
    if(operation === 'add'){
        result = addMatrices(matrix1, matrix2);
    }else if(operation === 'subtract'){
        result = subtractMatrices(matrix1, matrix2);
    }
    else if(operation === 'multiply'){
        result = multiplyMatrices(matrix1, matrix2);
    }
    showResult2D('The Result', 'matrix3', result);
}


const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
    // provide the code
    let addMatrix = [];
    if(matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length){
        let errorMessage = "Sorry, cannot compute matrices of different size";
        displayErrorMessage(errorMessage);
        return;
    }

    //loop for iterating through rows and cols
    for(let i = 0; i < matrix1.length; i++){
        let row = [];
        for(let j = 0; j < matrix1[0].length; j++){
            row.push(matrix1[i][j] + matrix2[i][j]);
        }
        addMatrix.push(row);
    }
    return addMatrix;
}

//code for subtracting Matrices. 
const subtractMatrices = function (matrix1, matrix2) { 
    let subMatrix = [];

    if(matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length){
        let errorMessage = "Sorry, cannot compute matrices of different size";
        displayErrorMessage(errorMessage);
        return;
    }

    //Identical for the code for add but with a - operand.
    for(let i = 0; i < matrix1.length; i++){
        let row = [];
        for(let j = 0; j < matrix1[0].length; j++){
            row.push(matrix1[i][j] - matrix2[i][j]);
        }
        subMatrix.push(row);
    }
    return subMatrix;
};

//code for multiplying Matrices
const multiplyMatrices = (matrix1, matrix2) => { 
    let multiMatrix = [];

    if(matrix1[0].length !== matrix2.length || matrix1.length !== matrix2[0].length){
        let errorMessage = "Sorry, cannot compute matrices of different size";
        displayErrorMessage(errorMessage);
        return;
    }
   //Identical for the code for add but with a *

    for(let i = 0; i < matrix1.length; i++){
        let row = [];
        for(let j = 0; j < matrix1[0].length ; j++){
            let add = 0;
            for(let index = 0; index < matrix1[0].length; index++){
                add += matrix1[i][index] * matrix2[index][j];
            }
            row.push(add);
        }
        multiMatrix.push(row);
    }
    return multiMatrix;
};

//Ensure that your functions include checks for the feasibility of the operations
//Extra code used to print out the error message. 
const displayErrorMessage = (errorMessage) => {
    
    //we need to set the proper Id.
    //follows format set in lecture
    let errorContainer = document.getElementById('errorCont');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'errorCont';
        document.body.appendChild(errorContainer);
    }
    //sets the container content = error messgae 
    errorContainer.textContent = errorMessage;
};

//Extra code used to clear the error message once it is complete. 
const clearErrorMessage = () => {
    let errorContainer = document.getElementById('errorCont');
    if (errorContainer) {
        //same method used for clearing result earlier. 
        errorContainer.innerHTML = '';
    }
};

