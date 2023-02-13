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