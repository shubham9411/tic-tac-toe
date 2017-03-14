// Player Initialization
var player = 'x';
var opponent = 'o';
var board = {
	0 : {
		0 : 'x', 1 : 'o', 2 : 'x',
	},
	1 : {
		0 : 'o', 1 : 'o', 2 : 'x',
	},
	2 : {
		0 : '_', 1 : 'o', 2 : '_',
	},
};
var bestMove = {
	row : -1,
	col : -1,
};
// function to check the minimum of two values
function min( a, b ){
	return ( a > b ) ? b : a;
}
// function to check the maximum of two values
function max( a, b ){
	return ( a > b ) ? a : b;
}
/**
 * Evaluate Function for checking if their is a win.
 **/
var evaluate = function( board ){
	// Check for the Row.
	for ( i = 0 ; i < 3 ; i++ ) {
		if ( board[i][0] == board[i][1] && board[i][1] == board[i][2]){
			if( player == board[i][0] ){
				return 10;
			}
			else if( opponent == board[i][0] ){
				return -10;
			}
		}
	}
	// Check for the Column.
	for ( j = 0 ; j < 3 ; j++ ) {
		if ( board[0][j] == board[1][j] && board[1][j] == board[2][j]){
			if( player == board[0][j] ){
				return 10;
			}
			else if( opponent == board[0][j] ){
				return -10;
			}
		}
	}
	// Check for the Diagnols.
	if ( board[0][0] == board[1][1] && board[2][2] == board[1][1]){
		if( player == board[0][0] ){
			return 10;
		}
		else if( opponent == board[0][0] ){
			return -10;
		}
	}
	if ( board[0][2] == board[1][1] && board[2][0] == board[1][1]){
		if( player == board[0][2] ){
			return 10;
		}
		else if( opponent == board[0][2] ){
			return -10;
		}
	}
	return 0;
}

/**
 * Function to if Moves left
 **/
var isMoveLeft = function( board ) {
	for ( i = 0 ; i < 3 ; i++ ) {
		for ( j = 0 ; j < 3 ; j++ ) {
			if ( '_' == board[i][j] ){
				return true;
			}
		}
	}
	return false;
}

/**
 * Function to finding the next best move.
 **/
var minimax = function( board, depth, isMax = 0 ) {
	var score = evaluate( board );
	console.log( 'score ' + score );
	if ( -10 == score ) {
		alert('leaving' );
		return score;
	}
	if ( 10 == score ) {
		return score;
	}
	if ( ! isMoveLeft ( board ) ) {
		alert('nomove');
		return 0;
	}
	if ( 1 == isMax ) {   // Now maximizingg the value
		console.log('max');
		var best = -1000;
		for ( i = 0 ; i < 3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {

				if ( '_' == board[i][j] ) {
					board[i][j] = player;
					depth++;
					best = max( best, minimax( board , depth , 0 ) );
					board[i][j] = '_';
				}
			}
		}
		return best;
	}
	if ( 0 == isMax ) {  // Now minimizingg the value
		console.log('min');
		var best = 1000;
		for ( i = 0 ; i <3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {

				if ( '_' == board[i][j]) {
					board[i][j] = opponent;
					depth++;
					best = min( best, minimax( board , depth , 1 ) );
					board[i][j] = '_';
				}

			}
		}
		return best;
	}
}

/**
 * Function to finding the next best move.
 **/
var findBestMove = function( board ) {
	bestVal = -1000;
	bestMove = {
		row : -1,
		col : -1,
	};
	for ( i = 0; i < 3; i++ ) {
		for ( j = 0; j < 3 ; j++ ) {
			if ( '_' == board[i][j] ) { // if empty
				board[i][j] = player;
				moveVal = minimax( board, 0 , 0 );
				board[i][j] = '_';  //backing off to previous empty value
				if ( moveVal > bestVal ) {
					bestMove.row = i;
					bestMove.col = j;
					bestVal = moveVal;
				}
			}
		}
	}
	return bestMove;
}

class lol{
	constructor(value){
		this.lol = value;
	}
	static l(){
		alert('lol');
	}
}

jQuery(document).ready(function(){
	console.log(board);
	lol = new lol;
	lol.l();
	console.log(max(2,4));
	bestMove = findBestMove(board);
	console.log(bestMove);
});
