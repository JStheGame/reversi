class Tile {
	constructor(x, y) {
		this.width = 100;
		this.height = 100;
		this.x = x;
		this.y = y;
		this.colour = -1;
		this.pop = false;
	}

	draw() {
		const fills = [[25, 25, 25], [235, 235, 235]];
		const filler = this.colour > -1 ? fills[this.colour] : [240 - 10 * this.x - 10 * this.y, 90 + 20 * this.x, 90 + 20 * this.y];
		if(this.pop) {
			for(let i = 0; i < 3; i++) {
				filler[i] += player ? 20 : -20;
			}
		}
		push();
		fill(...filler);
		noStroke();
		rect(100 * this.x + 50, 100 * this.y + 50, this.width, this.height);
		pop();
	}

	highlight() {
		this.pop = true;
	}

	unhighlight() {
		this.pop = false;
	}

	mark(player) {
		if(this.colour > -1) {
			console.log("hey you can't do that!");
		} else {
			// check for validity
			const valid = checkTile(this.x, this.y, player);

			if(valid) {
				// log the move
				transcript.push(String.fromCharCode(65 + this.x) + (this.y + 1));
				console.log(transcript.join``);

				// mark the board
				this.colour = player;

				// log the board
				logBoard();

				// next player's turn!
				nextPlayer();
			}
			
		}
	}
}