let source;

let tiles = [];
let cols = 4;
let rows = 4;
let w,h;
let board = [];
let blankSpot = -1;

/*
let S = 0;
let t = 0;
let m = 0;
let dt = 3;


let hr = 0;
let min = 0;
let sec = 0;
let stopTime = true;

*/

function preload(){
  source = loadImage("new.jpg");
}

function setup() {
  let canv = createCanvas(400, 400);
  canv.position(50, 50);
  w = width/ cols;
  h = height/ rows;
 // S = 0;

  for (let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x = i * w;
      let y = j * h;
      let img = createImage  (w,h);
      //let img = source.copy;
      img.copy(source, x , y, w, h, 0, 0, w, h);   
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      //16th total tiles
      tiles.push(tile  );
  
    }
  }
  
  tiles.pop();
  board.pop();
  board.push(-1);
  simpleShuffle(board);

  /*
  // For Timer:

  var div = createDiv('');

  div.html("00:00:00");
  div.position(150, 450); 
  div.style('font-size', '24px');
  div.style('border', '1px solid white');
 // div.style('text-align', 'center');

 startTimer();
 timeCycle();
*/



}


function swap(i, j, arr){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  
}

function randomMove(arr){
    let r1 = floor(random(cols)); 
    let r2 = floor(random(rows));  
    move(r1, r2, arr);
}
  
function simpleShuffle(arr){
  for(let i =0; i < 10000; i++){
    randomMove(arr)
    //let r1 = floor(random(cols)); 
    //let r2 = floor(random(rows));  
    //move(r1, r2, arr);
    
  }  
} 

function mousePressed()
{
  let i = floor(mouseX/ w);
  let j = floor(mouseY/ h);
  console.log(i, j);
  move(i, j, board);
/*
  if (S===0)
   S=1;
 
  console.log("Value of S "+ S);
*/
}


/*
// Timer:

function startTimer() {
  if(stopTime == true){
      stoptime = false;
      timeCycle();
  }
}

function stopTimer(){
  if(stoptime == false){
    stoptime = true;
  }
}

function timeCycle(){
   if(stoptime == false && S == 1){
     sec = int(sec);
     min = int(min);
     hr = int(hr);
    
     sec = sec + 1;

     if(sec == 60){
       min = min + 1;
       sec = 0;
     }
     if(min == 60){
       hr = hr + 1;
       min = 0;
       sec = 0;
     }
     if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }
   
    }

    //div.html = hr + ':' + min + ':' + sec;
    console.log(hr + ':' + min + ':' + sec);
    setTimeout("timerCycle()", 1000);

}

function resetTimer() {
  div.html = "00:00:00";
  stoptime = true;
  hr = 0;
  sec = 0;
  min = 0;
  S = 0;
}
*/
function draw() {
  background(0);
  // image(source,0,0);
  
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      
      if (tileIndex > -1){  
      let img = tiles[tileIndex].img;
      image(img, x, y, w, h);
      }
    }
  }
  
  
    for (let i = 0; i < cols; i++){
    for (let j =0; j < rows; j++){
      let x = i * w;
      let y = j * h;
      //strokeWright(2);
      noFill();
      rect(x, y, w, h);
      
    }
  }
   // randomMove(board);
  if (isSolved()){
    console.log("SOLVED");
  }  
/*
  if (S===1){
    t=t+dt;
   // console.log("t Time:" + t);
    if(t > 60){
      m = m + 1;
      t = 0;
      console.log("Time :" + m);
    }
    
    }

    text("hi", 150, 500);
*/

}

    function isSolved(){
    for(let i =0; i < board.length-1; i++){
      if (board[i] !== tiles[i].index) {
        return false;
       
      }
    }
      
    return true;
      
  }
  
   function move(i, j, arr){
    let blank = findBlank();
    let blankCol = blank % cols;
    let blankRow = floor(blank / rows);
    
    if (isNeighbor(i, j, blankCol, blankRow)){
      swap(blank, i + j * cols, arr);
      
    }
  }
  

  function isNeighbor(i, j, x, y){
    if(i !== x && j !== y){
      return false;
    }
    
    if(abs(i-x) == 1 || abs(j-y) == 1){
      return true;
      //abs means Absolute Value.
    }
    
    return false;
  }
  
  function findBlank(){
    for (let i= 0; i< board.length; i++){
      if(board[i] == -1) return i;
    }
  }
  

