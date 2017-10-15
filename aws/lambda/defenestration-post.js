/*
  Post to the game server. Return a stringified
*/

'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    var jsonObject = event;
    var min = jsonObject.min;
    var max = jsonObject.max;

    let generatedNumber = Math.floor(Math.random()* (max - min) + min);

    let jsonWrapper = {
        generatedNum : generatedNumber
    }

    var response =
    {
    "statusCode": 200,
    "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": true
    },
  "body" : generateRound(4)
}

   callback(null, response);
};

function generateRound(numTurns){
    var round = {
        turns : generateTurns(numTurns)
    }
    return round;
}

function generateTurns(numTurns){
    var turns = [];
    for(var i = 0; i < numTurns; i++){
        var turn = {
            map : generateMap(15, 15),
            actors : generateActors(3, i)
        }
        turns.push(turn);
    }
    return turns;
}

function generateActors(numActors, turnNum){
    var actors = [];
    for (var i = 0; i < numActors; i++){
        var actor = {
            "xPos" : i,
            "yPos" : turnNum
        }
        actors.push(actor);
    }
    return actors;
}

function generateMap(xSize, ySize){
  return  {
        "rows" : generateRows(xSize, ySize)
    }
}

function generateRows(xSize, ySize){
    var rows = [];
    for(var j = 0; j < ySize; j++ ){
        var row = "";
        for(var i = 0; i < xSize; i++){
            row = row + selectRandomTile();
        }
        rows.push(row);

    }
    return rows;
}

function selectRandomTile(){
 return Math.random() < 0.2 ? "#" : ".";
}
