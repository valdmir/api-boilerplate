var express = require('express');
var path=require('path');
var utils = require(path.join(__dirname, "../../utils.js"));
var jwt=require('jsonwebtoken');
var routes = function(app){
  var router = express.Router();
  var controller=require('../controllers/UserController')(app);
  // for api routes
  router.route('/users').post(controller.store);
  // route middleware to verify a token
  router.use(utils.middleware());
  // router.route('/users').get(controller.get);
  // router.route('/users/:id').get(controller.get_id);
  // router.route('/users/searches/:by/:query').get(controller.search);
  // router.route('/users/:id').put(controller.put);
  // router.route('/users/:id').delete(controller.delete);
  router.route('/profile').get(controller.me);
  router.route('/profile').put(controller.update_profile);
  // router.route('/change-password').put(controller.change_password);


  return router;
};
module.exports= routes;
