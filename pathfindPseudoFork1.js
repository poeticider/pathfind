//this psuedo-fork was created to attempt to fix a bug found through testing on a limited time frame. 
//Only 2 lines of code have been altered (see lines 147 + 153). This did not remove the found bug however.


//2D array with assigned name. Replicating maze example from README.md
let A = [
    [true, true, true, true, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true]
];

//vectors with assigned names. vector[0] represents x axis position. vector[1] represents y axis position.
//I am replicating P and Q's start positions in the README.md example.
let P = [0, 1];
let Q = [3, 2];

//function to find shortest route in maze
const pathfind = (maze, startPosition, endPosition) => {

    //mazeVector will be used to create new array represented as a list of numbers
    //in ascending order from 0 > maze length -1.
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
    const mazeRows = maze[0].length;
    //this function assumes the maze will always be a square. Regardless I have created a Columns variable for the sake of code readability.
    const mazeCols = mazeRows;
    //to be used in line 133
    const mazeSize = mazeVector.length;

    //start && end position must now be converted to a single numeric value to match their place within the mazeVector array.

    //start and end positions are calculated as a single number.
    //first arr number represents x axis(rows) and second arr number represents y axis(columns)
    //thus position[0] * mazeRows + position[0] will convert the array coordinate into a single number.
    let startPositionAsNum = startPosition[0] * mazeRows + startPosition[1];
    let endPositionAsNum = endPosition[0] * mazeRows + endPosition[1];

    console.log(`The start position in the maze is: ${startPositionAsNum}\n`);
    console.log(`The end postion in the maze is: ${endPositionAsNum}\n`);

    //end of code for converting function arguments into (integer-array, integer, integer).
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
        const topTile = tile - mazeRows; 
        const bottomTile = tile + mazeRows;
        const leftTile = tile - 1; 
        const rightTile = tile + 1;
        
        //sorting tile types. Null are 'false' walls within maze. Undefined are beyond boundaries of maze(ie unassigned)
        if(vectorMaze[topTile] !== null && vectorMaze[topTile] !== undefined) {
            adjacentTiles.push(topTile);

        }

        if(vectorMaze[bottomTile] !== null && vectorMaze[bottomTile] !== undefined) {
            adjacentTiles.push(bottomTile);

        }

        //hard coded modulo 5 !== 4 for 5x5 maze breaking 6x6 maze. Needs dynamic vars
        if(leftTile % mazeRows !== mazeRows -1 && vectorMaze[leftTile] !== null && vectorMaze[leftTile] !== undefined) {
            adjacentTiles.push(leftTile);

        }
        
        //hard coded modulo 5 !== 0 for 5x5 maze breaking 6x6 maze. Needs dynamic vars
        if(rightTile % mazeRows !== 0 && vectorMaze[rightTile] !== null && vectorMaze[rightTile] !== undefined) {
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
//pathfind(A, P, Q);
//expected: 6 moves

//calling pathfind() with different start/end position
let testStart1 = [4, 4]
let testEnd1 = [1, 4]
// pathfind(A, testStart1, testEnd1);
//expected: 3 moves

//calling pathfind() with impassible end position
let testEnd2 = [1, 2]
//pathfind(A, testStart1, testEnd2);
//expected: -1 moves

//calling pathfind() with end integer that is not in maze
let testStart3 = [1, 10000];
//pathfind(A, testStart3, Q);
//expected: -1 moves

//calling pathfind() with end integer that is not in maze
let testEnd3 = [1, 10000];
//pathfind(A, testStart1, testEnd3);
//expected: -1 moves

//calling pathfind with 6x6 maze with same layout as 5x5
let testMaze1 = [
    [true, true, true, true, true, true],
    [true, false, false, false, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
]

pathfind(testMaze1, P, Q);
//expected: 6 moves
//stated end position is incorrect.
//expected end position: 15 actual end position: 20

//calling pathfind with a different 6x6 maze
let testMaze2 = [
    [true, true, true, true, true, true],
    [true, false, false, false, false, false],
    [true, true, true, false, true, true],
    [true, true, true, false, true, true],
    [true, true, true, true, true, true],
    [true, false, false, false, true, false],
]

let testStart6X6 = [5, 2];
let testEnd6X6 = [5, 0];

//pathfind(testMaze2, testStart6X6, testEnd6X6);
//expected: 16 moves //states 6 moves.
//expected start position: 17. actual start position: 32
//expected end position: 5. actual start position: 30
//maze logic appears to be bugged for non 5x5 mazes 

//on 143 + 149 hard coded integers were found in arthimatic that will only work on 5x5 maze