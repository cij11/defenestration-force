/*
  AWS lambda function. Recieves event via AWS gateway. Generates a random
  map and returns to caller.
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
  "body" : generateMap(15, 15)
}

   callback(null, response);
};

function generateMap(xSize, ySize){
  return {
    "map" : {
        "rows" : generateRows(xSize, ySize)
    }
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
