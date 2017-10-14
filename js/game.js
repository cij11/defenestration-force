//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 320;
document.body.appendChild(canvas);

//Load images
var floorImage = new Image();
var floorReady = false;
floorImage.onload = function() {
  floorReady = true;
}
floorImage.src = "images/floor.bmp";

var wallImage = new Image();
var wallReady = false;
wallImage.onload = function() {
  wallReady = true;
}
wallImage.src = "images/wall.bmp";

var heroImage = new Image();
var heroReady = false;
heroImage.onload = function() {
  heroReady = true;
}
heroImage.src = "images/hero.png";

var tileSize = 32;

$.ajax({
  type: 'POST',
  url: "https://g6arya4tcf.execute-api.ap-southeast-1.amazonaws.com/prod",
  headers: {
    "Content-Type": "text/plain",
  },
  data: JSON.stringify({
    "min": 100,
    "max": 1000
  })
}).done(function(data) {
  console.log("Starting POST experiment:");
  console.log(data);

  playbackRound(data);
  //  renderMap(data.body.map);
  renderObjects();
});

//A round is an array of turns. Each turn holds the state of the map and players
//at that turn. Replay these sequentially.
function playbackRound(data) {
  var currentTurn = 0;
  playbackTurn(currentTurn, data);
//renderMap(data.body.maps[0]);
}

function playbackTurn(currentTurn, data) {
  if (currentTurn >= data.body.maps.length) {
    return;
  }
  console.log(data.body.maps[currentTurn]);
  renderMap(data.body.maps[currentTurn].map);

  //Advance to the next map in one second
  setTimeout(function() {playbackTurn(currentTurn + 1, data)}, 1000);
}

function renderMap(map) {
  console.log(map);
  console.log(map.rows);
  for (var j = 0; j < map.rows.length; j++) {
    for (var i = 0; i < map.rows[j].length; i++) {
      var tile = map.rows[j][i];
      if (tile == '.') {
        ctx.drawImage(floorImage, i * tileSize, j * tileSize);
      } else {
        ctx.drawImage(wallImage, i * tileSize, j * tileSize);
      }
    }
  }
}

function renderObjects() {
  ctx.drawImage(heroImage, 3 * tileSize, 3 * tileSize);
}
