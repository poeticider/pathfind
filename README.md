# Oxbury Pathfind

Imagine representing a grid-shaped game map as a 2-dimensional array. Each value of this array is
boolean `true` or `false` representing whether that part of the map is passable (a floor) or blocked
(a wall).

Write a function that takes such a 2-dimensional array `A` and 2 vectors `P` and `Q`, with `0,0` being the top left corner of the map and returns the distance of the shortest path between those points, respecting the walls in the map.

eg. Given the map (where `.` is passable - `true`, and `#` is blocked - `false`)

```
. P . . .
. # # # .
. . . . .
. . Q . .
. . . . .
```

then `pathfind(A, P, Q)` should return `6`.

_Please avoid using libraries to implement the algorithmic side of this challenge, other libraries (such as PHPUnit or Jest for testing) are welcome._

## What to do

1. Clone/Fork this repo or create your own
2. Implement the function described above in any mainstream language you wish
3. Provide unit tests for your submission
4. Fill in the section(s) below

## Comments Section

<!---
Please fill in the sections below after you complete the challenge.
--->

### What I'm Pleased With
My approach was ad-hoc due to my lack of knowledge with pathfinding algorithms and testing. However, I felt I managed the limited timescale well.

I split this task into 3 even parts-
1 Simulating the maze environment through arrays
2 Pathfinding from designated start to end point within the maze
3 Testing. (Ran somewhat low on time here sadly)

Although I imagine this has senior developers raising an eyebrow, I am quite please with my system to simplify the start/finish arrays + 2d maze-array into a start/end integer + simple number-array.
I've no doubt there are much shorter code solutions however as a junior with no prior experience of the given task this convertion to integers helped SIGNIFICANTLY in semiotics, maze manipulation/navigation and most important of all, simply
UNDERSTANDING the code.

As previously stated, I have never done pathfinding before and my knowledge of node traversal is limited. However, I did sufficient research and I am satisfied the breadth-first search I chose to use was a good choice for the given task.

Ultimately, although I have found evident bugs, I am very happy I managed to get a working prototype finished in the limited time-frame I had. I feel I gave this task my best shot, and regardless of the outcome this task has been a good
learning experience for me on the never-ending path to becoming a better programmer.

### What I Would Have Done With More Time
As previously stated, I chose to split this task into 3 even parts. I would have liked more time to properly research testing (as I had researched pathfinding algorithms) and to create proper try/catch tests (etc) isolating small blocks of code. In particular, considering I found a bug when changing the maze sizes I would have liked to try and isolate this issue through testing. 

Likewise, I did not even attempt to allow for mazes that were not square in shape. Once I had ensured my code works for rectangular mazes, I would've been the next feature I would've liked to allow for mazes with arrays of differing lengths. 
