//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 320;
document.body.appendChild(canvas);

//Load images
var floorImage = new Image();
var floorReady = false;
floorImage.onload = function(){
  floorReady = true;
}
floorImage.src="images/floor.bmp";

var wallImage = new Image();
var wallReady = false;
wallImage.onload = function(){
  wallReady = true;
}
wallImage.src="images/wall.bmp";

var tileSize = 32;

$.ajax({
  type: 'POST',
  url: "https://g6arya4tcf.execute-api.ap-southeast-1.amazonaws.com/prod",
  headers: {
      "Content-Type":"text/plain",
  },
  data: JSON.stringify(
    {"min":100, "max":1000}
  )
}).done(function(data) {
  console.log("Starting POST experiment:");
  console.log(data);
  console.log(data.body.generatedNum);

  renderMap(data.body.map);
});

function renderMap(map){
    for (var j = 0; j < map.rows.length; j++){
      for(var i = 0; i < map.rows[j].length; i++){
        var tile = map.rows[j][i];
        if(tile == '.'){
        ctx.drawImage(floorImage, i*tileSize, j*tileSize);
      }
      else{
        ctx.drawImage(wallImage, i*tileSize, j*tileSize);
      }
      }
    }
}
