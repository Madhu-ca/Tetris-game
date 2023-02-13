//step 1: create canvas to draw 2D graphics using JavaScript.
    let canvas = document.querySelector("#tetris");

//step 2: create a scoreboard to display score
    let scoreboard = document.querySelector("h2");

//step 3: create context --- renders graphics inside the canvas element
    let ctx = canvas.getContext("2d");

//step 4: make context bigger using scale method 
    ctx.scale(30,30);

//30,30  -- 30 px far from left, 30px far from top 
//The default unit on the canvas is one pixel scalemakes 30 times bigger than actual size
//height of canvas 600 / 20 rows = 30 columns

//step 5: create different shapes for different blocks
//		- for this create array group
    const SHAPES = [
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,1,0],  
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
            [0,0,0]
        ],
        [
            [1,1,1],
            [0,1,0],
            [0,0,0]
        ],
        [
            [1,1],
            [1,1],
        ]
    ]

//step 6: create different colours for different blocks

	const COLORS = [
        "#fff",
        "#9b5fe0",
        "#16a4d8",
        "#60dbe8",
        "#8bd346",
        "#efdf48",
        "#f9a52c",
        "#d64e12"
    ]

//step 7: create rows & columns
	const ROWS = 20;
	const COLS = 10;    

//step 8: create grid 
//  		- grid is a pattern of horizontal and vertical lines that cross each 
//            other to make a set of squares.
        
    let grid = generateGrid();

//step 9: Initialise falling object to null
	let fallingPieceObj = null;
    
//step 10: Initialise score to 0
    let score = 0;

//step 11: to generate grid for block
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

//step 12: set interval between falling objects to 500ms or 0.5s
//set interval is used because for falling objects,call function again & again
    setInterval(newGameState,500);

    function newGameState(){
        checkGrid();
    
        if(!fallingPieceObj){
            fallingPieceObj = generateRandomPieceObject();
            renderPiece();
        }
        moveDown();
    }

//to clear horizontal row/line/grid which is filled 
//then add new grid
    function checkGrid(){
        let count = 0;

        for(let i=0; i<grid.length; i++){
            let allFilled = true;
            for(let j=0; j<grid[i].length; j++){
                if(grid[i][j] == 0){
                    allFilled = false;
                }
            }
            if(allFilled){
                grid.splice(i,1);  //splice ith filled row
                grid.unshift([0,0,0,0,0,0,0,0,0,0]); //then add grid of 10 cols
                count++;
            }
        }

    //update the score when a row is filled
        if(count == 1){
            score+=10;
        }else if(count == 2){
            score+=20;
        }else if(count == 3){
            score+=30;
        }else if(count == 4){
            score+=40;
        }else if(count == 5){
            score+=50;
        }else if(count>5){
            score+=100
        }
        scoreboard.innerHTML = "Score: " + score;
    }

//to generate random blocks or select one out of 7 arrays
//let fallingPieceObj = generateRandomPieceObject();
//console.log(fallingPieceObj);
    function generateRandomPieceObject(){
        let ran = Math.floor(Math.random()*7);  //we get random elements from 0 to 6 as we have 7 elements in array 
        //console.log(ran);   
        //console.log(SHAPES[ran]);   //O/P: diff shape or array of random index

        let piece = SHAPES[ran];  
        let colorIndex = ran + 1; // +1, because for 0 , we have given white colour(#fff)
        let x = 4;
        let y = 0;
        return{piece, colorIndex, x, y}; //return object i,e, 
    }
//initially co-ordinate will be at (0,0) - top left corner , x = 0, y = 0
//we want blocks to appear somewhere in the middle(not exactly middle) of canvas 
//so value of x coordinate should be increased


//to show blocks 

function renderPiece(){
    let piece = fallingPieceObj.piece; // select a block / piece

    for(let i=0; i<piece.length; i++){
        for(let j=0; j<piece[i].length; j++){
            if(piece[i][j] == 1){       //show colour only piece of i,j == 1
                ctx.fillStyle = COLORS[fallingPieceObj.colorIndex]; //to inform which colour is used for block
                //ctx.fillRect(j,i,1,1);  //started with j , because to move along column, i.e.., at x= 2/ 5/ 7/ 3/ 9
                //above coordinate is at top-left corner, but we need somewhere in the middle

                ctx.fillRect(fallingPieceObj.x+j,fallingPieceObj.y+i,1,1);
            
            }
        }
    }
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
        rotate();
    }
})

//to makes blocks falling down
// only moveDown();  function does not do falling down process
//so we define newGameState function above

//for down increase y by 1
//if down collision is not there, update y 
function moveDown(){
    //console.log("hello");
    
    if(!collision(fallingPieceObj.x, fallingPieceObj.y+1))
        fallingPieceObj.y += 1;
    
    else{
        //when collided , only grid should have colour, others are white
        let piece = fallingPieceObj.piece;

        for(let i=0; i<piece.length; i++){
            for(let j=0; j<piece[i].length; j++){
                if(piece[i][j] == 1){ //if there is a colour col p = cordinate of grid
                    let p = fallingPieceObj.x+j;  // p is column
                    let q = fallingPieceObj.y+i;  // q is row
                    grid[q][p] = fallingPieceObj.colorIndex;
                }
            }
        }
        if(fallingPieceObj.y == 0){
            alert("Game over");
            grid = generateGrid(); // after we r using same grid ,so generate new grid
            score = 0; 
        }
        fallingPieceObj = null; 
        //once bottom is reached, block is not piece anymore, 
        //then,next block ocurrs continuously
    }    
    renderGrid();
}

//for right increase x by 1
 //if right collision is not there, increase x
function moveRight(){
   
    if(!collision(fallingPieceObj.x+1, fallingPieceObj.y))
        fallingPieceObj.x += 1;
        
    renderGrid();
}

//for left decrease x by 1
 //if left collision is not there, decrease x 
function moveLeft(){

    if(!collision(fallingPieceObj.x-1, fallingPieceObj.y))
        fallingPieceObj.x -= 1;

    
    renderGrid();
}

//to change shape of block to required shape
function rotate(){
    let rotatedPiece = [];
    let piece = fallingPieceObj.piece;
    for(let i=0; i<piece.length; i++){ //creating an empty array of size of piece 
        rotatedPiece.push([]);

        for(let j=0; j<piece[i].length; j++){
            rotatedPiece[i].push(0);
        }
    } 
        
   //for transpose of matrix 
    for(let i=0; i<piece.length; i++){
        for(let j=0; j<piece[i].length; j++){
           rotatedPiece[i][j] = piece[j][i]; 
        }
    }

    //reverse of row
    for(let i=0; i<rotatedPiece.length; i++){
        rotatedPiece[i] = rotatedPiece[i].reverse();
    }

    if(!collision(fallingPieceObj.x, fallingPieceObj.y, rotatedPiece))
         fallingPieceObj.piece = rotatedPiece;

    renderGrid();
}

//to avoid blocks moving extreme left/right i.e. out of canvas, 
//clamps(walls) are provided at both ends
function collision(x,y,rotatedPiece){
    let piece = rotatedPiece || fallingPieceObj.piece;
    for(let i=0; i<piece.length; i++){
        for(let j=0; j<piece[i].length; j++){
            if(piece[i][j] == 1){
                let p = x+j;  // p is column
                let q = y+i;  // q is row

                //condition to check whether blocks are inside walls
                if(p >= 0 && p < COLS && q >= 0  && q< ROWS){  //it is <, not <=
                    //if a block is present at bottom
                    if(grid[q][p] > 0){  
                        return true; //if present return true
                    }
                }
                else{
                    return true;  // if collided return true
                }
            }
        }
    }
    return false;
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
