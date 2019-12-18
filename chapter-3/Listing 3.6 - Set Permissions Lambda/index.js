/**
 * Created by Peter Sbarski
 * Serverless Architectures on AWS
 * http://book.acloud.guru/
 * Last Updated: Feb 11, 2017
 */

'use strict';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.handler = function(event, context, callback){

    console.log('**************');

    console.log(JSON.stringify(event));
    var message = JSON.parse(event.Records[0].Sns.Message);
    var sourceBucket = message.Records[0].s3.bucket.name;
    //console.log('message:', message);

    var sourceKey = decodeURIComponent(message.Records[0].s3.object.key.replace(/\+/g, ' '));

    var params = {
        Bucket: sourceBucket,
        Key: sourceKey,
        ACL: 'public-read'
    };
    console.log('param:', params);
    console.log('**************');
    s3.putObjectAcl(params, function(err, data){
        if (err) {
            callback(err);
        }
    });
};
