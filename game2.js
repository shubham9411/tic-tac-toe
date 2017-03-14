var game = (function(){
// Player Initialization
var player = 'x';
var opponent = 'o';
var board = [];
var bestMove = [];
function reset_board(){
	for(i=0;i<3;i++){
		board.pop([]);
	}
	for(i=0;i<3;i++){
		board.push([ '_', '_', '_' ]);
	}
}
function min( a, b ){
	return ( a > b ) ? b : a;
}
function max( a, b ){
	return ( a > b ) ? a : b;
}
function evaluate(){
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
function isMoveLeft() {
	for ( i = 0 ; i < 3 ; i++ ) {
		for ( j = 0 ; j < 3 ; j++ ) {
			if ( '_' == board[i][j] ){
				return true;
			}
		}
	}
	return false;
}
function minimax( depth, isMax ) {
	var score = evaluate();
	if ( -10 == score ) {
		return (score + depth);
	}
	if ( 10 == score ) {
		return (score - depth);
	}
	if ( ! isMoveLeft() ) {
		return 0;
	}
	if ( 1 == isMax ) {   // Now maximizingg the value
		var best = -1000;
		for ( i = 0 ; i < 3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {
				if ( '_' == board[i][j] ) {
					board[i][j] = player;
					depth += 1;
					best = max( best, minimax( depth , 0 ) );
					board[i][j] = '_';
				}
			}
		}
		return best;
	}
	if ( 0 == isMax ) {  // Now minimizingg the value
		var best = 1000;
		var i,j;
		for ( i = 0 ; i < 3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {
				if ( '_' == board[i][j]) {
					board[i][j] = opponent;
					depth += 1;
					best = min( best, minimax( depth , 1 ) );
					board[i][j] = '_';
				}

			}
		}
		return best;
	}
}
function findBestMove() {
	var bestVal = -1000;
	var bestMove = {
		row : -1,
		col : -1,
	};
	var moveVal,i,j;
	for ( i = 0; i < 3; i++ ) {
		for ( j = 0; j < 3 ; j++ ) {
			if ( '_' == board[i][j] ) { // if empty
				board[i][j] = player;
				moveVal = minimax( 0 , 0 );
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
return{
	init:function(){
		reset_board();
		console.log(board);
		var x = findBestMove();
		console.log(x);
		console.log(board);
	}
}
})();