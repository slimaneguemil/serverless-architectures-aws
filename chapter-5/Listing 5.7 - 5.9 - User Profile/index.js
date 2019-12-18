/**
 * Created by Peter Sbarski
 * Serverless Architectures on AWS
 * http://book.acloud.guru/
 * Last Updated: Feb 11, 2017
 */

'use strict';
var AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');
var request = require('request');

exports.handler = function(event, context, callback){

    console.log('*****************');
    console.log('event:',JSON.stringify(event));
    if (!event.authToken) {
    	callback('Could not find authToken event :' + JSON.stringify(event));
    	return;
    }

    var token = event.authToken.split(' ')[1];

    var secretBuffer = new Buffer(process.env.AUTH0_SECRET);

        // var options2 = {
        //   url: 'https://'+ process.env.DOMAIN + '/userinfo',
        //   method: 'POST',
        //   json: true,
        //   body: body
        // };
    var options = {
        url: 'https://'+ process.env.DOMAIN + '/userinfo',
        method: 'GET',
        headers: {
            'authorization': event.authToken
        }
    };

        request(options, function(error, response, body){
            console.log(' POST *****************', options);
          if (!error && response.statusCode === 200) {
              console.log(' SUCCESS *****************', error);
            callback(null, body);
          } else {
              console.log(' ERROR *****************', response.statusCode);
            callback(error);
          }
        });

};
