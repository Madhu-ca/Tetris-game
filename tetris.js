const SHAPES =[     // 7 shapes 
    [               // representing shapes in an array
        [0,1,0,0],  //0 -- invisible, 1 -- shape & colour is visible
        [0,1,0,0],
        [0,1,0,0],  //this array is vertical block
        [0,1,0,0]
    ],
    [
        [0,1,0],    //this array is block of reverse L shape
        [0,1,0],
        [1,1,0]
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,1,0]
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
    [
        [1,1],
        [1,1]
    ]
]
const COLORS = [ //8 colours , diffcolour to diff shapes
    "#fff",
    "#9b5fe0",
    "#16a4d8",
    "#8bd346",
    "#efdf48",
    "#d64e12",
    "#f9a52c",
    "#d636c6"
]

//constraints as in coding problems
const ROWS = 20;
const COLS = 10;

//context
//canvas - drawing board,  ctx - drawing pen , with these one can draw anything
let canvas = document.querySelector("#tetris");  //don't forget #
let ctx = canvas.getContext("2d");  //2d - 2d drawing board
ctx.scale(30,30);
//height of canvas = 600 , 20 rows .... 600 / 20 = 30 - height of lock

//to generate random blocks or select one out of 7 arrays
let pieceObj = null;  //initially pieceobj = null
let grid = generateGrid();
console.log(grid);
//let pieceObj = generateRandomPiece();
//console.log(pieceObj);
function generateRandomPiece(){
    let ran = Math.floor(Math.random()*7);  
    console.log(ran);   //we get random elements from 0 to 6 as we have 7 elents in array 
    console.log(SHAPES[ran]);   //O/P: diff shape or array of random index

//initially co-ordinate will be at (0,0) - top left corner , x = 0, y = 0
//we want blocks to appear somewhere in the middle(not exactly middle) of canvas 
//so value of coordinate should be increased

    let piece = SHAPES[ran];  
    let colorIndex = ran + 1; // +1, because for 0 , we have given white colour(#fff)
    let x = 4;
    let y = 0;
    return{piece,x, y, colorIndex}; //return object i,e, 
}

setInterval(newGameState,500);  //for falling blocks,call fuction again & again

function newGameState(){
    if(pieceObj == null){
        pieceObj = generateRandomPiece();
        renderPiece();
    }
    moveDown();

}
//to show blocks 
// renderPiece();
function renderPiece(){
    let piece = pieceObj.piece; // select a block / piece
    for(let i=0; i<piece.length; i++){
        for(let j=0; j<piece[i].length; j++){
            if(piece[i][j] == 1){       //show colour only piece of i,j == 1
                ctx.fillStyle = COLORS[pieceObj.colorIndex]; //to inform which colour is used for block
                //ctx.fillRect(j,i,1,1);  //started with j , because to move along column, i.e.., at x= 2/ 5/ 7/ 3/ 9
                //above coordinate is at top-left corner, but we need somewhere in the middle

                ctx.fillRect(pieceObj.x+j,pieceObj.y+i,1,1);
            
            }
        }
    }
}

//to makes blocks falling down
// only moveDown();  function does not do falling down process
//so we define newGameState function above

//for down increase y by 1
//if down collision is not there, update y 
function moveDown(){
    //console.log("hello");
    
    if(!collision(pieceObj.x, pieceObj.y+1))
        pieceObj.y += 1;
    
    else{
        //when collided , only grid should have colour, others are white
        for(let i=0; i<pieceObj.piece.length; i++){
            for(let j=0; j<pieceObj.piece[i].length; j++){
                if(pieceObj.piece[i][j] == 1){ //if there is a colour col p = cordinate of grid
                    let p = pieceObj.x+j;  // p is column
                    let q = pieceObj.y+i;  // q is row
                    grid[q][p] = pieceObj.colorIndex;
                }
            }
        }
        pieceObj = null; 
        //once bottom is reached, block is not piece anymore, 
        //then,next block ocurrs continuously
    }    
    renderGrid();
}

//for right increase x by 1
 //if right collision is not there, increase x
function moveRight(){
   
    if(!collision(pieceObj.x+1, pieceObj.y))
        pieceObj.x += 1;
        
    renderGrid();
}

//for left decrease x by 1
 //if left collision is not there, decrease x 
function moveLeft(){

    if(!collision(pieceObj.x-1, pieceObj.y))
        pieceObj.x -= 1;

    
    renderGrid();
}

//to avoid blocks moving extreme left/right i.e. out of canvas, 
//clamps(walls) are provided at both ends
function collision(x,y){
    let piece = pieceObj.piece;
    for(let i=0; i<piece.length; i++){
        for(let j=0; j<piece[i].length; j++){
            if(piece[i][j] == 1){
                let p = x+j;  // p is column
                let q = y+i;  // q is row

                //condition to check whether blocks are inside walls
                if(p >= 0 && p < COLS && q >= 0  && q< ROWS){  //it is <, not <=

                }
                else{
                    return true;  // if collided return true
                }
            }
        }
    }
    return false;
}
//to generate grid for block

function generateGrid(){
    let grid = [];
    for(let i=0; i<ROWS; i++){
        grid.push([]);
        for(let j=0; j<COLS; j++){
            grid[i].push(0);
        }
    }
    return grid;
}

function renderGrid(){
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[i].length; j++){
               
            ctx.fillStyle = COLORS[grid[i][j]]; 
            ctx.fillRect(j,i,1,1);
        }
    }
                //above for loop makes white drawing board
    renderPiece(); // this generates falling blocks
}

//to press key(right / left) after falling block appears
document.addEventListener("keydown",function(e){
    console.log(e); //-- to check which key is pressed
    
    let key = e.code;
    if(key == "ArrowDown"){
        moveDown();
    }else if(key == "ArrowLeft"){
        moveLeft();
    }
    else if(key == "ArrowRight"){
        moveRight();
    }
    else if(key == "ArrowUp"){
        rotatePiece();
    }
})