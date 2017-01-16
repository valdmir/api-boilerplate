// Name Controller
"use strict";
var UserController = function(app){
  let models= require('../models');
  let StoreRequest=require('../requests/StoreUserRequest');
  let UpdateRequest=require('../requests/UpdateUserRequest');
  let crip=require('bcryptjs');
  let async=require('async');
  let get= function(req,res){
    models.User.findAll({attributes: {
        exclude: ['password']
    }}).then(function(users) {
      res.json({users: users});
    });
  };

  var get_id= function(req,res){
    models.User.findOne({where:{id:req.param('id')},attributes: {
        exclude: ['password']
    }}).then(function(user) {
      if(user){
        res.json({user: user});
      }
      else{
        res.status(204).json();

      }
    });
  };
  var search= function(req,res){
    var query={where:[req.param('by')+" LIKE '%"+req.param('query')+"%'"],attributes: {
        exclude: ['password']
    }};
    models.User.findAll(query).then(function(users) {
      res.json(
        {users: users});
    });
  };
  var store= function(req,res){
    req.checkBody(StoreRequest);
    var errors=req.validationErrors();
    if(errors){
      res.status(422).json({errors:errors});
    }
    else{
      models.User.find({where:{email:req.body.email}}).then(function(user){
        if(user){

          res.status(422).json({errors:[{param:"email",msg:"Email already exists"}]});
        }
        else{
          req.body.password=crip.hashSync(req.body.password, 10);
          models.User.create(req.body).then(function(user) {

            res.status(201).json({user:user});
          });
        }
      });

    }


  };
  var put=function(req,res){
    req.checkBody(UpdateRequest);
    var errors=req.validationErrors();
    if(errors){
      res.status(422).json({errors:errors});
    }
    else{
      var pass=req.body.password;
      req.body.password=crip.hashSync(req.body.password,10);
      models.User.findOne({where:{id:req.param('id')},attributes: {
          exclude: ['password']
      }}).then(function(user){
        if(user){
          user.update(req.body).then(function(user) {
            res.json({user:user});
          });
        }
        else{
          res.status(204).json();
        }

      })
    }
  };
  var remove=function(req,res){
    models.User.findById(req.param('id')).then(function(user){
      if(user){
        user.destroy().then(function(user) {
          res.json({message:'Delete user with ID  '+req.param('id')+' successfull'});
        });
      }
      else{
        res.status(204).json();
      }

    })

  };
  var me= function(req,res){
    let access=req.decoded;
    models.User.findOne({where:{id:access.id},attributes: {
        exclude: ['password']
    }}).then(function(user) {
      if(user){
        res.json({user: user});
      }
      else{
        res.status(204).json();

      }
    });
  };
  var update_profile=function(req,res){
    req.checkBody(UpdateRequest);
    var errors=req.validationErrors();
    if(errors){
      res.status(422).json({errors:errors});
    }
    else{
      models.User.findOne({where:{id:req.param('id')},attributes: {
          exclude: ['password']
      }}).then(function(user){
        if(user){
          user.update(req.body).then(function(user) {
            res.json({user:user});
          });
        }
        else{
          res.status(204).json();
        }

      })
    }
  };
  var update_password=function(req,res){
    req.checkBody(UpdateRequest);
    var errors=req.validationErrors();
    if(errors){
      res.status(422).json({errors:errors});
    }
    else{
      var pass=req.body.password;
      models.User.findOne({where:{id:req.param('id')},attributes: {
          exclude: ['password']
      }}).then(function(user){
        if(user){
          user.update(req.body).then(function(user) {
            res.json({user:user});
          });
        }
        else{
          res.status(204).json();
        }

      })
    }
  };
  // for showing
  return {
    get:get,
    get_id:get_id,
    search:search,
    store:store,
    put:put,
    delete:remove,
    me:me,
    update_profile:update_profile,
    update_password:update_password,
  };

}
module.exports= UserController;
