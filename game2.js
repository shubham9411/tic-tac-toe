// function to check the minimum of two values
function min( a, b ){
	if( a > b ){
		return b;
	}
	if( b > a ){
		return a;
	}
}
// function to check the maximum of two values
function max( a, b ){
	if( a > b ){
		return a;
	}
	if( b > a ){
		return b;
	}
}
class game{
	constructor(board, player, opponent){
		this.board = board;
		this.player = player;
		this.opponent = opponent;
	}
	 evaluate(){
		// Check for the Row.
		for ( i = 0 ; i < 3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {
				if ( board[i][0] == board[i][1] && board[i][1] == board[i][2]){
					if( this.player == board[i][0] ){
						return 10;
					}
					else if( this.opponent == board[i][0] ){
						return -10;
					}
					else if( 'b' == board[i][0] ){
						return 0;
					}
				}
			}
		}
		// Check for the Column.
		for ( i = 0 ; i < 3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {
				if ( board[0][j] == board[1][j] && board[1][j] == board[2][j]){
					if( this.player == board[0][j] ){
						return 10;
					}
					else if( this.opponent == board[0][j] ){
						return -10;
					}
					else if( 'b' == board[0][j] ){
						return 0;
					}
				}
			}
		}
		// Check for the Diagnols.
		for ( i = 0 ; i < 3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {
				if ( board[0][0] == board[1][1] && board[2][2] == board[1][1]){
					if( this.player == board[0][0] ){
						return 10;
					}
					else if( this.opponent == board[0][0] ){
						return -10;
					}
					else if( 'b' == board[0][0] ){
						return 0;
					}
				}
				else if ( board[0][2] == board[1][1] && board[2][0] == board[1][1]){
					if( this.player == board[0][2] ){
						return 10;
					}
					else if( this.opponent == board[0][2] ){
						return -10;
					}
					else if( 'b' == board[0][2] ){
						return 0;
					}
				}
			}
		}
	}

	 isMoveLeft() {
		for ( i = 0 ; i < 3 ; i++ ) {
			for ( j = 0 ; j < 3 ; j++ ) {
				if ( 'b' == board[i][j] ){
					return true;
				}
			}
		}
		return false;
	}

	 minimax( board, depth, isMax = 0 ) {
		console.log(board);
		console.log(depth);
		var score = evaluate( board );
		console.log('score ' + score);
		if ( -10 == score ) { //Future tweeking for 10 - score
			return score;
		}
		if ( 10 == score ) { //Future tweeking for score -10 
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
					if ( 'b' == board[i][j] ) {
						board[i][j] = this.player;
						depth++;
						bestVal = minimax( board , depth , 0 );
						best = max( best, bestVal );
						board[i][j] = 'b';
					}
					return best;
				}
			}
		}
		if ( 0 == isMax ) {  // Now minimizingg the value
			console.log('min');
			var best = 1000;
			for ( i = 0 ; i <3 ; i++ ) {
				for ( j = 0 ; j < 3 ; j++ ) {
					if ( 'b' == board[i][j]) {
						board[i][j] = this.opponent;
						depth++;
						bestVal = minimax( board , depth , 1 );
						console.log(bestVal);
						best = min( best, bestVal );
						board[i][j] = 'b';
					}
					console.log(i,j);
					return best;
				}
			}
		}
	}

	 findBestMove( board ) {
		bestVal = -1000;
		bestMove = {
			row : -1,
			col : -1,
		};
		for ( i = 0; i < 3; i++ ) {
			for ( j = 0; j < 3 ; j++ ) {
				if ( 'b' == board[i][j] ) { // if empty
					board[i][j] = this.player;
					moveVal = minimax( board, 0 );
					board[i][j] = 'b';  //backing off to previous empty value
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
}
jQuery(document).ready(function(){
	var board = {
		0 : {
			0 : 'x', 1 : 'o', 2 : 'b',
		},
		1 : {
			0 : 'x', 1 : 'o', 2 : 'b',
		},
		2 : {
			0 : 'o', 1 : 'x', 2 : 'b',
		},
	};
	move = new game(board,'x','o') 
	console.log(move.bestMove);
});