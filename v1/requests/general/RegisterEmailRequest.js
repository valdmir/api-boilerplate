module.exports={
 'email': {
    isEmail:true,
    errorMessage: 'Email is Required'

  },
  'password': {
    notEmpty: true,
    errorMessage: 'Password is Required' // Error message for the parameter
  },
  'name': {
    notEmpty: true,
    errorMessage: 'Name is Required' // Error message for the parameter
  },
}
