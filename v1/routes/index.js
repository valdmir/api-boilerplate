
var routes= function(app){
  var general=require('./general')(app);
  var packages=require('./packages')(app);
  var users=require('./users')(app);
  var activity=require('./activity')(app);
  var schedule=require('./schedule')(app);

  app.use("/api/v1",general);
  app.use("/api/v1",users);
  app.use("/api/v1",packages);
  app.use("/api/v1",activity);
  app.use("/api/v1",schedule);


  return app;
}
module.exports=routes;
