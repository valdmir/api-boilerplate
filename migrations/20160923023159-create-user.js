'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email:{
        type:Sequelize.STRING,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
      },
      fb_id:{
        type:Sequelize.STRING
      },
      fb_token:{
        type:Sequelize.STRING
      },
      fb_token_expired:
      {
        type:Sequelize.DATE
      },
      google_id:{
        type:Sequelize.STRING
      },
      google_token:{
        type:Sequelize.STRING
      },
      google_token_expired:{
        type:Sequelize.DATE
      },
      profession:{
        type:Sequelize.STRING,
      },
      avatar:{
        type:Sequelize.STRING,
      },
      country:{
        type:Sequelize.STRING,
      },
      city:{
        type:Sequelize.STRING,
      },
      live_since:{
        type:Sequelize.INTEGER,
      },
      language:{
        type:Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      card_id:{
        type:Sequelize.STRING,
      },
      is_verified:{
        type:Sequelize.INTEGER,
        defaultValue:0,
      },
      phone_number:{
        type:Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
