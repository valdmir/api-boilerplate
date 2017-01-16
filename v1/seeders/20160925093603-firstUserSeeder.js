'use strict';

module.exports = {

  up: function (queryInterface, Sequelize) {
    var crip=require('bcryptjs');
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    console.log(Date.now());
    return queryInterface.bulkInsert('users', [{
      name: 'User',
      email:'user1@getlocals.com',
      password:crip.hashSync('user1akses',10),
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: 'Local',
      email:'local@getlocals.com',
      password:crip.hashSync('local1akses',10),
      country:"Indonesia",
      city:"bali",
      live_since:"1990",
      created_at: new Date(),
      updated_at: new Date()
    }], {});

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
