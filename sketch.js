// constants
const screenWidth = 800;
const screenHeight = 800;

// sprite variables
const tiles = [];

// gameplay variables
const board = [];
let player = 0;
const transcript = [];

function nextPlayer() {
	player = 1 - player;
}

// runs once, when the page is ready
function setup() {
	createCanvas(screenWidth, screenHeight);
	noSmooth();
	rectMode(CENTER);

	// create a field of tiles
	for(let x = 0; x < 8; x++) {
		tiles.push([]);

		for(let y = 0; y < 8; y++) {
			tiles[x].push(new Tile(x, y));
		}
	}

	tiles[3][3].colour = 1;
	tiles[3][4].colour = 0;
	tiles[4][3].colour = 0;
	tiles[4][4].colour = 1;
	
}

// this function gets called every frame, 
// and it updates the position of all the sprites
function update() {
	// update all the sprites
	// listen for clicks?
	for(const row of tiles) {
		for(const tile of row) {
			tile.unhighlight();
		}
	}

	const [x, y] = [mouseX, mouseY].map(coord => floor(coord / 100));
	if(x in tiles && y in tiles[x]) tiles[x][y].highlight();

}

// this function fires every frame
function draw() {
	update();

	for(const row of tiles) {
		for(const tile of row) {
			tile.draw();
		}
	}
}

function mousePressed() {
	const [x, y] = [mouseX, mouseY].map(coord => floor(coord / 100));
	tiles[x][y].mark(player);
}


function checkTile(x, y, player) {
	const other = 1 - player;
	let valid = false;
	let affectedTiles = new Set();

	for(let dx = -1; dx <= 1; dx++) {
		nextDirection:
		for(let dy = -1; dy <= 1; dy++) {
			if(dx || dy) {
				const maybeTiles = new Set();

				if(x + dx in tiles && y + dy in tiles[x + dx] && tiles[x + dx][y + dy].colour === other) {
					// valid so far, continue until you find your own colour
					maybeTiles.add(tiles[x + dx][y + dy]);

					for(let i = 2; ; i++) {
						const [nextX, nextY] = [x + i * dx, y + i * dy];
						if(!(nextX in tiles) || !(nextY in tiles[nextX]) || tiles[nextX][nextY].colour === -1) continue nextDirection;
						
						if(tiles[nextX][nextY].colour === player) break;

						maybeTiles.add(tiles[nextX][nextY]);
					}
					
					valid = true;
					affectedTiles = new Set([...affectedTiles, ...maybeTiles]);
				}
			}
		}
	}

	if(valid) {
		// mark affected tiles
		for(const tile of affectedTiles) {
			tile.colour = player;
		}
	} else console.log("no, invalid move")

	return valid;
}

function logBoard() {
	const board = [];

	for(let i = 0; i < 8; i++) {
		board.push([]);
		for(let j = 0; j < 8; j++) {
			board[i].push(tiles[j][i].colour);
		}
	}

	console.log(`[${board.map(row => `"${row.map(x => x === -1 ? "." : x).join``}"`).join`,`}]`);
}