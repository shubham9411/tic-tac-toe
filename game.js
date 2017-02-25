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
	console.log(board);
}
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

window.onload = evaluate( board );