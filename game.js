// Player Initialization
var player = 'x';
var opponent = 'o';
/**
 * Initial Board with no values.
 **/
board = {
	0 : {
		0 : '_',
		1 : '_',
		2 : '_',
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

/**
 * Evaluate Function for checking if their is a win.
 **/
function evaluate( board){
	// Check for the Row.
	for ( i = 0 ; i < 3 ; i++ ) {
		for ( j = 0 ; j < 3 ; j++ ) {
			if ( board[i][0] == board[i][1] && board[i][1] == board[i][2]){
				if( 'x' == board[i][0] ){
					return 10;
				}
				else if( 'o' == board[i][0] ){
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
				if( 'x' == board[0][j] ){
					return 10;
				}
				else if( 'o' == board[0][j] ){
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
				if( 'x' == board[0][0] ){
					return 10;
				}
				else if( 'o' == board[0][0] ){
					return -10;
				}
				else if( '_' == board[0][0] ){
					return 0;
				}
			}
			else if ( board[0][2] == board[1][1] && board[2][0] == board[1][1]){
				if( 'x' == board[0][0] ){
					return 10;
				}
				else if( 'o' == board[0][0] ){
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
 * Function to finding the next best move.
 **/
function bestMove( board ) {
	var bestVal = -1000;
	bestMove = {
		row : -1,
		col : -1,
	}
	for ( i = 0; i < 3; i++ ) {
		for ( j = 0; j < 3 ; j++ ) {
			if ( '_' === board[i][j] ) { // if empty
				board[i][j] = player;
				var moveVal = minimax( board , 0 , false );
				board[i][j] = '_';  //backing off to previous emplty value
				if ( moveVal > bestVal ) {
					bestMove.row = i;
					bestMove.col = j;
					bestVal = moveVal;
				}
			}
		}
	}
}

window.onload = bestMove( board );
