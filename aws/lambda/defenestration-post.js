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
  "body" : jsonWrapper
}

   callback(null, response);
};
