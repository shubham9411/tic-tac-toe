// Player Initialization
var player = 'x';
var opponent = 'o';
/**
 * Initial Board with no values.
 **/
board = {
	0 : {
		0 : 'x',
		1 : 'x',
		2 : 'x',
	},
	1 : {
		0 : '_',
		1 : '_',
		2 : '_',
	},
	2 : {
		0 : '_',
		1 : '_',
		2 : '_',
	}
}
bestMove = {
	row : -1,
	col : -1,
}
// function to check the minimum of two values
function min( a, b ){
	if( a > b ){
		return b;
	}
	if( b > a ){
		return a;
	}
	return null;
}
// function to check the maximum of two values
function max( a, b ){
	if( a > b ){
		return a;
	}
	if( b > a ){
		return b;
	}
	return null;
}
/**
 * Evaluate Function for checking if their is a win.
 **/
function evaluate( board){
	// Check for the Row.
	for ( i = 0 ; i < 3 ; i++ ) {
		for ( j = 0 ; j < 3 ; j++ ) {
			if ( board[i][0] == board[i][1] && board[i][1] == board[i][2]){
				if( player == board[i][0] ){
					return 10;
				}
				else if( opponent == board[i][0] ){
					return -10;
				}
				else if( '_' == board[i][0] ){
					return 0;
				}
			}
		}
	}
	// Check for the Column.
	for ( i = 0 ; i < 3 ; i++ ) {
		for ( j = 0 ; j < 3 ; j++ ) {
			if ( board[0][j] == board[1][j] && board[1][j] == board[2][j]){
				if( player == board[0][j] ){
					return 10;
				}
				else if( opponent == board[0][j] ){
					return -10;
				}
				else if( '_' == board[0][j] ){
					return 0;
				}
			}
		}
	}
	// Check for the Diagnols.
	for ( i = 0 ; i < 3 ; i++ ) {
		for ( j = 0 ; j < 3 ; j++ ) {
			if ( board[0][0] == board[1][1] && board[2][2] == board[1][1]){
				if( player == board[0][0] ){
					return 10;
				}
				else if( opponent == board[0][0] ){
					return -10;
				}
				else if( '_' == board[0][0] ){
					return 0;
				}
			}
			else if ( board[0][2] == board[1][1] && board[2][0] == board[1][1]){
				if( player == board[0][0] ){
					return 10;
				}
				else if( opponent == board[0][0] ){
					return -10;
				}
				else if( '_' == board[0][0] ){
					return 0;
				}
			}
		}
	}
}

/**
 * Function to if Moves left
 **/
function isMoveLeft( board ) {
	for ( i = 0 ; i < 3 ; i++ ) {
		for ( j = 0 ; j < 3 ; j++ ) {
			if ( '_' === board[i][j] ){
				return true;
			}
		}
	}
	return false;
}

/**
 * Function to finding the next best move.
 **/
function minimax( board, depth, isMax ) {
	var score = evaluate( board );
	if ( -10 == score ) { //Future tweeking for 10 - score
		return score;
	}
	if ( 10 == score ) { //Future tweeking for score -10 
		return score;
	}
	if ( ! isMoveLeft ( board ) ) {
		return 0;
	}
	if ( isMax ) {   // Now maximizingg the value
		var best = -1000;
		for ( i = 0 ; i <3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {
				if ( '_' === board[i][j] ) {
					board[i][j] = player;
					bestVal = minimax( board , depth+1 , false );
					best = max( best, bestVal );
					board[i][j] = '_';
				}
				return best;
			}
		}
	}
	if ( ! isMax ) {  // Now minimizingg the value
		var best = +1000;
		for ( i = 0 ; i <3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {
				if ( '_' === board[i][j] ) {
					board[i][j] = opponent;
					bestVal = minimax( board , depth+1 , true );
					best = min( best, bestVal );
					board[i][j] = '_';
				}
				return best;
			}
		}
	}
}

/**
 * Function to finding the next best move.
 **/
function findBestMove( board ) {
	var bestVal = -1000;
	bestMove = {
		row : -1,
		col : -1,
	}
	for ( i = 0; i < 3; i++ ) {
		for ( j = 0; j < 3 ; j++ ) {
			if ( '_' === board[i][j] ) { // if empty
				board[i][j] = player;
				var moveVal = minimax( board, 0, false );
				board[i][j] = '_';  //backing off to previous empty value
				if ( moveVal > bestVal ) {
					bestMove.row = i;
					bestMove.col = j;
					bestVal = moveVal;
				}
			}
		}
	}
}

window.onload = alert('start');