"use strict";
let express = require('express');
let jwt= require('jsonwebtoken');
let authenticateEmailRequest=require('../requests/general/AuthenticateEmailRequest');
let registerEmailRequest=require('../requests/general/RegisterEmailRequest');
let authenticateProviderRequest=require('../requests/general/AuthenticateProviderRequest');
let models= require('../models');
let config= require('../../config/config.json');
let crip=require('bcryptjs');
let passport=require('passport');
let async=require('async');

var routes = function(app){
  var router = express.Router();
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.send("welcome to GetLocals API V1");
    // res.render('index', { title: 'Express' });
  });
  // for authencation
  router.post('/auth',function(req,res,next){
    req.checkBody(authenticateEmailRequest);
    var errors=req.validationErrors();
    if(errors){
      res.status(422).json({errors:errors});
    }
    else{
      passport.authenticate('local',{session:false},function(err,user,info){
        if (err) { return next(err); }
        if (!user) { return res.status(200).json({"message":"Email or password invalid"}) }
        res.status(200).json({message: 'Enjoy your token!',token: info.token,user:user});
      })(req,res,next);
    }
  });
  router.post('/auth/provider',function(req,res,next){
    req.checkBody(authenticateProviderRequest);
    var errors=req.validationErrors();
    if(errors){
      res.status(422).json({errors:errors});
    }
    else{
      passport.authenticate('facebook',{scope:"email",session:false},function(err,user,info){
        if (err) { return next(err); }
        if (!user) { return res.status(200).json({"message":"Email or password invalid"}) }
        res.status(200).json({message: 'Enjoy your token!',token: info.token,user:user});
      })(req,res,next);
    }
  });
  // for register
  router.post('/register',function(req,res,next){
    req.checkBody(registerEmailRequest);
    var errors=req.validationErrors();
    if(errors){
      res.status(422).json({errors:errors});
    }
    else{
      var findEmail=function(callback){
        models.User.find({where:{email:req.body.email}}).then(function(user){
          if(user){
            callback("user already exists");
          }
          else{
            callback(null);
          }
        });
      }
      var createUser=function(callback){
        let data=req.body;
        data.password=crip.hashSync(req.body.password, 10);
        models.User.create(data).then(function(user) {
          callback(null,"done");
        });
      }
      async.waterfall([findEmail,createUser],function(err,result){
        if(err){
          return res.status(422).json({errors:[{param:"email",msg:"Email already exists"}]});
        }
        return res.status(201).json();
      });
    }
  });

  return router;
}
module.exports = routes;
