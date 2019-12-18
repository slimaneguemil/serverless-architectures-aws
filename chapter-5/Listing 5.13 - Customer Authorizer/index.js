/**
 * Created by Peter Sbarski
 * Serverless Architectures on AWS
 * http://book.acloud.guru/
 * Last Updated: Feb 11, 2017
 */

'use strict';

var jwt = require('jsonwebtoken');

var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}

exports.handler = function(event, context, callback){
    if (!event.authorizationToken) {
    	callback('Could not find authToken');
    	return;
    }
    var token = event.authorizationToken.split(' ')[1];

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
            callback(null, generatePolicy('user', 'allow', event.methodArn));

        } else {
            console.log(' ERROR *****************', response.statusCode);
            callback('Authorization Failed');
        }
    });

};
