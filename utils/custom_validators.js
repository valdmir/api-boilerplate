var expressValidator=require('express-validator');
var moment=require('moment');
var validator = require('validator');
var util=require('util');
var custom=expressValidator({
 customValidators: {
    isValidDatetimeArray:function(values){
      if(util.isArray(values)){
        return values.every(val=>{
          return moment(val,"YYYY-MM-DD hh:mm").isValid();
        });
      }
      return moment(values,"YYYY-MM-DD hh:mm").isValid();

    },
    isIntArray:function(values){
      if(values==undefined){
        return false;
      }
      if(util.isArray(values)){
        return values.every(val=>{
          return validator.isInt(val);
        });
      }
      return validator.isInt(values);

    },
 }
});
module.exports=custom;
