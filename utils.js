
var config=require('./config/config.json');
var jwt=require('jsonwebtoken');
module.exports.fetch = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length === 2) {
            var token = part[1];
            return part[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports.middleware = function () {

    var func = function (req, res, next) {

        var token = exports.fetch(req.headers);
        if (token) {
          // verifies secret and checks exp
          jwt.verify(token, config.supersecret, function(err, decoded) {
            if (err) {
              return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;
              next();
            }
          });

        } else {

          // if there is no token
          // return an error
          return res.status(401).send({
              success: false,
              message: 'No token provided.'
          });
        }
    };

    return func;

};
module.exports.uploadS3=function(params){
  var AWS = require('aws-sdk');

var s3 = new AWS.S3();

// Bucket names must be unique across all S3 users


 s3.putObject(params, function(err, data) {

     if (err) {

         console.log(err)

     } else {

         console.log("Successfully uploaded data to "+params.Bucket+" "+params.Key);

     }

  });

}
