module.exports={
  'name': {
     notEmpty: true,
     errorMessage:"Name is Required",
   },
  'email': {
     notEmpty: true,
     isEmail:true,
     errorMessage:"Email is Required",
   },
   'password': {
     notEmpty: true,
     errorMessage: 'Password is Required' // Error message for the parameter
   }
}
