
/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  var solution = new Board({n:n});

  var rowCounter = 0;
  var innerFunction = function(){
    for(var col = 0; col < n; col++){
      if(rowCounter === n){
        return;
      }
      solution.togglePiece(rowCounter, col);
      // note - come back to this
      if (solution.hasAnyRooksConflicts()){
        solution.togglePiece(rowCounter, col);
        continue;
      }
      rowCounter++;
      innerFunction();
    }
  };
  innerFunction();
  solution = solution.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  //function to recursively seed rooks in decision tree and sub-trees
  var innerFunction = function(board, rowCounter){
    if (rowCounter === n){
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; col++){
      // place rook on board then check if there's conflict
      board.togglePiece(rowCounter, col);
      if (board.hasColConflictAt(col)){
        board.togglePiece(rowCounter, col);
        // if there would be conflict, this won't be a starting point
        continue;
      }
      innerFunction(board, rowCounter+1);
      board.togglePiece(rowCounter, col);
    }
  };

  var solution = new Board({n:n});  // not declared in a function, so each iteration still works on the same solution board
  innerFunction(solution, 0);

/*
  for(var i =0; i<n; i++){
    // n starting points
    var solution = new Board({n:n});  // not declared in a function, so each iteration still works on the same solution board
    solution.togglePiece(0, i);
    // move to the next row
    // rowCounter = 1;
    innerFunction(solution, 1);
    //untoggle so that each iteration and sub-iteration (in innerFunction) can be unpolluted
    solution.togglePiece(0,i);
  }
*/
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.returnAllNQueensSolutions = function(n) {
  var allSolutions = [];
  // matrixes don't copy directly, so need a helper function
  var matrixCopy = function(matrix){
    var result = [];
    for (var i = 0; i < matrix.length; i++){
      var copy = matrix[i].slice();
      result[i] = copy;
    }
    return result;
  }

  //function to recursively seed rooks in decision tree and sub-trees
  var innerFunction = function(board, rowCounter){
    if (rowCounter === n){
      var boardArray = board.rows();
      var copy = matrixCopy(boardArray);
      allSolutions.push(copy);
      return;
    }
    for (var col = 0; col < n; col++){
      // place queen on board then check if there's conflict
      board.togglePiece(rowCounter, col);
      // if (!board.hasAnyQueenConflictsOn(rowCounter, col)) {
      //   innerFunction(board, rowCounter + 1);
      // }

      // board.togglePiece(rowCounter, col);

      if (board.hasAnyQueenConflictsOn(rowCounter, col)){
        board.togglePiece(rowCounter, col);
        // if there would be conflict, this won't be a starting point
        continue;
      }
      innerFunction(board, rowCounter+1);
      board.togglePiece(rowCounter, col);
    }
  };

  var solution = new Board({n:n});  // not declared in a function, so each iteration still works on the same solution board
  innerFunction(solution, 0);

  return allSolutions;
};

window.findNQueensSolution = function(n) {

  var allSolutions = returnAllNQueensSolutions(n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(allSolutions[0]));
  return allSolutions[0] || {n:n};
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = returnAllNQueensSolutions(n).length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
