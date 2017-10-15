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

//Time until update to the next frame
var turnTime = 1000;
//Time to shift an actor between two tiles
var interpolationPeriod = 20;

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
});

//A round is an array of turns. Each turn holds the state of the map and players
//at that turn. Replay these sequentially.
function playbackRound(data) {
  var currentTurn = 0;
  playbackTurn(currentTurn, data);
//renderMap(data.body.maps[0]);
}

function playbackTurn(currentTurn, data) {
  if (currentTurn >= data.body.turns.length-1) {
    return;
  }
  renderFrame(data.body.turns[currentTurn].map, data.body.turns[currentTurn].actors, data.body.turns[currentTurn+1].actors, 0);

  //Advance to the next map in one second
  setTimeout(function() {playbackTurn(currentTurn + 1, data)}, 1000);
}

function renderFrame(map, actorsBegin, actorsEnd, interpolationCounter){
  if (interpolationCounter >= interpolationPeriod) return;

  //Rerender the map to stop actor trails
  renderMap(map);

  var u = interpolationCounter/interpolationPeriod;
  var v = 1 - u;

  for (var i = 0; i < actorsBegin.length; i++){
    renderActor(actorsBegin[i], actorsEnd[i], u, v);
  }
  setTimeout(function(){renderFrame(map, actorsBegin, actorsEnd, interpolationCounter+1)});
}

function renderMap(map) {
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

function renderActor(actorBegin, actorEnd, u, v){
  var x = actorBegin.xPos * v + actorEnd.xPos * u;
  var y = actorBegin.yPos * v + actorEnd.yPos * u;
  ctx.drawImage(heroImage, x * tileSize, y * tileSize);
}
