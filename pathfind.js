//2D array with assigned name. Replicating maze example from README.md
let A = [
    [true, true, true, true, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true]
];

//vectors with assigned names. vector[0] represents vertical position. vector[1] represents horizontal position.
//I am replicating P and Q's start positions in the README.md example.
let P = [0, 1];
let Q = [3, 2];

//function to find shortest route in maze
const pathfind = (maze, startPosition, endPosition) => {

    //logic only currently works for square mazes(ie 5x5). Warnings below check for non-square mazes.
    if(maze.length !== maze[0].length) {
        console.log(`WARNING: non-square maze detected.\nFunction may not behave correctly on non-square mazes.\n`);

    } else {
        maze.forEach((arr) => {
            if(arr.length !== maze[0].length) {
                console.log(`WARNING: different array lengths for maze detected.\nFunction may not behave correctly.\n`);

            }
        
        });
    }

    //mazeVector will be used to create new array represented as a list of numbers in ascending order from 0 > maze length -1.
    //this is because .js does not like complex arrays and to simplify maze navigation/manipulation using simple arthimetic.
    let mazeVector = [];
    let mazeEleCounter = 0;

    maze.forEach((array) => {
        //accessing each element within each vector
        array.forEach((tile) => {
            //accessible tiles are given a number in the vector array. Inaccesible tiles are type null
            if(tile !== false) {

                mazeVector.push(mazeEleCounter);

            } else if (tile == false) {

                mazeVector.push(null);

            }
            //generates a unique number to be assigned to each accesible (true) tile in maze
            mazeEleCounter++

        });

    });

    //displays maze converted into integers. ,, represents a 'null' value which represents inaccessible tiles
    console.log(`The following array has been generated to represent this maze:\n>> ${mazeVector} <<\n\n`)


    //-------------------------------------------------------------------------------------------------------------

    //this function assumes each row of the maze is the same length. Maze row length is stored in the below var.
    //this will be needed to convert start/end position to a single number.
    const mazeRowLength = maze[0].length;

    //start && end position must now be converted to a single numeric value to match their place within the mazeVector array.

    //start and end positions are calculated as a single number.
    //first arr number represents x axis(rows) and second arr number represents y axis(columns)
    //thus position[0] * mazeRowLength + position[0] will convert the array coordinate into a single number.
    let startPositionAsNum = startPosition[0] * mazeRowLength + startPosition[1];
    let endPositionAsNum = endPosition[0] * mazeRowLength + endPosition[1];

    //warning message to let you know if given start + end positions are inaccessible tiles. 
    if(mazeVector[startPositionAsNum] == null || mazeVector[startPositionAsNum] == undefined) {
        console.log(`WARNING the start position on tile ${startPositionAsNum} is inaccessible.\nPlease try another tile.`);

    } else {
        console.log(`The start position in the maze is: ${startPositionAsNum}\n`);

    }

    if(mazeVector[endPositionAsNum] == null || mazeVector[endPositionAsNum] == undefined) {
        console.log(`WARNING the start position on tile ${endPositionAsNum} is inaccessible.\nPlease try another tile.`);

    } else {
        console.log(`The end postion in the maze is: ${endPositionAsNum}\n`);

    }

    //end of code for converting function parameters into (integer-array, integer, integer).
    //--------------------------------------------------------------------------------
    
    
    //number of moves calculation. This uses breadth-first search (BFS) to calculate the shortest path from start to end.
    const calculateShortestPath = (startPositionAsNum, endPositionAsNum, vectorMaze) => {
        
        //Queue arr will hold tiles that have not yet been checked in BFS
        const queue = [];
        queue.push(startPositionAsNum);
    
        //Visited tiles will be stored here
        const visited = [];
        visited[startPositionAsNum] = true;
    
        //Stores the moves counter for each route from start to end
        const moves = [];
        moves[startPositionAsNum] = 0;
    
        //BFS loop logic. Will keep working until queue in empty.
        while(queue.length > 0) {

            const current = queue.shift();
    
            //trigger for reaching end destination in maze
            if(current === endPositionAsNum) {
                return moves[current];

            }
        
            //refers to getAdjacentTiles function on line 122.
            const adjacentTiles = getAdjacentTiles(current, vectorMaze);
        
            for(const tile of adjacentTiles) {
                //filling queue arr and checking off visited tiles
                if(!visited[tile]) {
                    queue.push(tile);
                    visited[tile] = true;
                    moves[tile] = moves[current] + 1;

                }
            }

        }
        //If no path is found between startPositionAsNum + endPositionAsNum, -1 is returned
        return -1;

    };

    //end of BFS function
    //---------------------------------------------------------------

    
    //Function to set maze rules + get tiles.
    //Function is called on line 104.
    const getAdjacentTiles = (tile, vectorMaze) => {
        const adjacentTiles = [];
        //tile starts as start position.
        //maze borders are calculated with arithmetic
        const topTile = tile - mazeRowLength; 
        const bottomTile = tile + mazeRowLength;
        const leftTile = tile - 1; 
        const rightTile = tile + 1;
        
        //sorting tile types. Null are 'false' walls within maze. Undefined are beyond boundaries of maze(ie unassigned)
        if(vectorMaze[topTile] !== null && vectorMaze[topTile] !== undefined) {
            adjacentTiles.push(topTile);

        }

        if(vectorMaze[bottomTile] !== null && vectorMaze[bottomTile] !== undefined) {
            adjacentTiles.push(bottomTile);

        }

        if(leftTile % mazeRowLength !== mazeRowLength -1 && vectorMaze[leftTile] !== null && vectorMaze[leftTile] !== undefined) {
            adjacentTiles.push(leftTile);

        }
        
        if(rightTile % mazeRowLength !== 0 && vectorMaze[rightTile] !== null && vectorMaze[rightTile] !== undefined) {
            adjacentTiles.push(rightTile);

        }
    
        return adjacentTiles;

    };
    //end of getAdjacentTiles function
    //----------------------------------------------------------------------

  
    //calling shortestPath function
    const shortestPath = calculateShortestPath(startPositionAsNum, endPositionAsNum, mazeVector);

    console.log(`The shortest path from tile ${startPositionAsNum} to tile ${endPositionAsNum} is ${shortestPath} moves.`);
  

};
//end of pathfind function
//--------------------------------------------------------------------------

//----------------------------------------------------Testing/function calls--------------------------------------------------------------


//calling pathfind() with README.md example arguments
pathfind(A, P, Q);
//expected start position: 1
//expected end position: 17
//expected moves: 6

//variables for testing-
let testStart1 = [4, 4];
let testEnd1 = [1, 4];
let testEnd2 = [1, 2];
let testStart3 = [1, 10000];
let testEnd3 = [1, 10000];
let testStart4 = [2, 5];
let testEnd4 = [0, 5];
let testStart5 = [2, 2];
let testEnd5 = [0, 2];

let testMaze6x6One = [
    [true, true, true, true, true, true],
    [true, false, false, false, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
];

let testMaze6x6Two = [
    [true, true, true, true, true, true],
    [true, false, false, false, false, false],
    [true, true, true, false, true, true],
    [true, true, true, false, true, true],
    [true, true, true, true, true, true],
    [true, false, false, false, true, false],
];

let testMaze3x3One = [
    [true, true, true],
    [true, false, false],
    [true, true, true],
];

let testMaze3x4One = [
    [true, true, true, true],
    [true, false, false, true],
    [true, true, true, true],
];

let testMazeIrregular = [
    [true, true, true, true],
    [true, false, false, true, true],
    [true, true, true, true],
];

//----------------------------------------------------------------------

//calling pathfind() with different start/end position
//pathfind(A, testStart1, testEnd1);
//expected start position: 24
//expected end position: 9
//expected moves: 3


//calling pathfind() with impassible end position.
//pathfind(A, testStart1, testEnd2);
//expected start position: 24
//expected end position: 7 (Warning for inaccessible tile)
//expected moves: -1


//calling pathfind() with start integer that is not in maze
//pathfind(A, testStart3, Q);
//expected start position: 10005 (Warning for inaccessible tile)
//expected end position: 17
//expected moves: -1


//calling pathfind() with end integer that is not in maze
//pathfind(A, testStart1, testEnd3);
//expected start position: 24 
//expected end position: 10005 (Warning for inaccessible tile)
//expected moves: -1


//calling pathfind with 6x6 maze with same layout as 5x5
//pathfind(testMaze6x6One, P, Q);
//expected start position: 1
//expected end position: 20
//expected moves: 6


//calling pathfind with a different 6x6 maze
//pathfind(testMaze6x6Two, testStart4, testEnd4);
//expected start position: 17
//expected end position: 5
//expected moves: 16 


//calling pathfind with 3x3 maze
//pathfind(testMaze3x3One, testStart5, testEnd5);
//expected start position: 8
//expected end position: 2
//expected moves: 6


//calling pathfind on non-square mazes.-------------------------------------------------------------
//Note I did not expect this to work as my current code assumes all mazes are square

//3x4 maze
//pathfind(testMaze3x4One, testStart5, testEnd5);
//expected non-square maze warning
//expected start position: 10
//expected end position: 2
//expected moves: 4


//calling pathfind on maze with arrays of different lengths
//pathfind(testMazeIrregular, testStart5, testEnd5);
//expected irregular arrays warning
//expected start position: 11. actual position 10
//expected end position: 2
//expected moves: 4


