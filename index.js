// Create a variable to update result: 
let result_p = document.querySelector(".result > p");
// Create a variable to store result_Img:
let result_img = document.getElementById("result_img");
// Create a multi-dimensional array with intaial values of null to store user input:
let puzzle = [[null,null,null, null,null,null, null,null,null],
              [null,null,null, null,null,null, null,null,null],
              [null,null,null, null,null,null, null,null,null],
              
              [null,null,null, null,null,null, null,null,null],
              [null,null,null, null,null,null, null,null,null],
              [null,null,null, null,null,null, null,null,null],

              [null,null,null, null,null,null, null,null,null],
              [null,null,null, null,null,null, null,null,null],
              [null,null,null, null,null,null, null,null,null]];
// Creat an onclick function that changes opactity to 1 when the user inputs a value:
const changeOpacity = (event) => {
  event.style.opacity = "1";
  event.value = "";
  event.style.color = 'black';
}

const noZeros = (event) => {
  if(event.value === '0'){
    event.style.background = "red";
  }
  else{
    event.style.background = 'none'; 
  }
};

// Create a function that will produce each input id: 
const getInputs = (arr, y) => {
  if(y === undefined){
    y = 0; 
  }

  for(let i = y; i < 81; i++){
    let inputText = 'inputText'+ i;
    storeValues(puzzle,inputText, y);
  }

  return sudokuIsValid(arr);
}                                                        
// Create a function that stores all the input values:
const storeValues = (arr, x, y) => {
  // Create a switch statement that checks y value to adjust the for loop start position: 
  switch(y){
    case 9:
    // Create a start variable for x and y for each switch case: 
      start_i = 1; 
      start_j = 0;
      break;
    case 18:
      start_i = 2;
      start_j = 0;
      break;
    case 27: 
      start_i = 3;
      start_j = 0;
      break; 
    case 36:
      start_i = 4;
      start_j = 0;
      break;
    case 45:
      start_i = 5;
      start_j = 0;
      break;
    case 54:
      start_i = 6;
      start_j = 0;
      break;
    case 63:
      start_i = 7;
      start_j = 0;
      break; 
    case 72:
      start_i = 8;
      start_j = 0;
      break;
    default:
      start_i = 0;
      start_j = 0;
    break;
  }
  // Create a maxLength for each row;
  let maxLength = 9; 
  // Create a varaible to store inputText:
  let inputText = parseInt(document.getElementById(x).value);

  for(let i = start_i; i < arr.length; i++){
    let row = arr[i];
    for(let j = start_j; j < row.length && j < maxLength; j++){
      if(row[j] === null){
        row.splice(j,1,inputText);
        y++;
        getInputs(arr, y);
      }
    }
  }
}

const getRow = (arr,row) => {
  return arr[row];
};

const getColumn = (grid,col) => {
  let result = [];

  for(let i = 0; i < grid.length; i++){
    let row = grid[i];
    result.push(row[col]);
  }
  return result; 
};

const getSection = (grid, x , y ) => {
  let result = [];
  let rangeX;
  let rangeY;

// Set and reassign the x range: 
  if(x === 0){
    rangeX = 3; 
  }
  else if(x === 1){
    rangeX = 6; 
    x = 3;
  }
  else{
    rangeX = 9; 
    x = 6;
  }

// Set and reassign the y range: 

  if(y === 0){
    rangeY = 3; 
  }
  else if(y === 1){
    rangeY = 6; 
    y = 3;
  }
  else{
    rangeY = 9; 
    y = 6;
  }
// loop through the sections:

  for(let i = y ; i < grid.length && i < rangeY; i++){
    let outside = grid[i];
    for(let j = x ; j < outside.length && j < rangeX; j++){
      result.push(outside[j]);
    }
  }
  return result; 
};

// //---------------------------PART 2 ---------


const includes1to9 = (arr)=> {

  let check = [1,2,3,4,5,6,7,8,9];
  let count = 0; 

  for(let i = 0; i < arr.length; i++ ){
    for(let j = 0; j < check.length; j++){
      if(arr[i] === check[j]){
        count ++;
        check.splice(j,1);
      }
    }
  }

  if(count == 9){
    return true; 
  }
  else{ 
    return false; 
  }
};

const sudokuIsValid = (grid) => {
  let count = 0; 

// getRow needs the puzzle and row:
  for(let i = 0; i < 9; i++){
    let checkRow = getRow(grid, i);
    // each row needs to be checked with includes1to9
    if(includes1to9(checkRow) === true){
      count ++; 
    }
  }

// getColumn needs the puzzle and col:

  for(let j = 0; j < 9; j++){
    let checkColumn = getColumn(grid, j);
   // each getColumn needs to be checked with includes1to9
    if(includes1to9(checkColumn) === true){
      count ++; 
    }
  }

  
// getSection needs the puzzle and x and y:

  for(let k = 0; k < 3; k++){
    for(let l = 0; l < 3; l++){
      let checkSection = getSection(grid, k, l);
    // each getSection needs to be check with includes1to9:
      if(includes1to9(checkSection) === true){
        count ++; 
      }
    }
  }

// Count needs to be 27 for each section, columns and row: 
  if(count === 27){
    console.log(true, count,puzzle);
    result_p.innerHTML = 'PASS';
    result_img.src = "h.png"
    return true; 
  }
  else{
    console.log(false, count, puzzle);
    result_p.innerHTML = 'FAIL';
    result_img.src = "v.png";
    return false; 
  }
};

// create a reset function: 

function reset(){
  puzzle = [[null,null,null, null,null,null, null,null,null],
            [null,null,null, null,null,null, null,null,null],
            [null,null,null, null,null,null, null,null,null],
            [null,null,null, null,null,null, null,null,null],
            [null,null,null, null,null,null, null,null,null],
            [null,null,null, null,null,null, null,null,null],
            [null,null,null, null,null,null, null,null,null],
            [null,null,null, null,null,null, null,null,null],
            [null,null,null, null,null,null, null,null,null]];
  console.log(puzzle);
  result_p.innerHTML = '';
  result_img.src ='';
  return puzzle; 
}