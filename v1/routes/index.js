
var routes= function(app){
  var general=require('./general')(app);
  var users=require('./users')(app);

  app.use("/api/v1",general);
  app.use("/api/v1",users);


  return app;
}
module.exports=routes;
