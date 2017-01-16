'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    fb_id:{
      type:DataTypes.STRING
    },
    fb_token:{
      type:DataTypes.STRING,
    },
    fb_token_expired:{
      type:DataTypes.DATE
    },
    google_id:{
      type:DataTypes.STRING
    },
    google_token:{
      type:DataTypes.STRING
    },
    google_token_expired:{
      type:DataTypes.DATE
    },
    avatar:{
      type:DataTypes.STRING,
    },
    country:{
      type:DataTypes.STRING,
    },
    city:{
      type:DataTypes.STRING,
    },
    live_since:{
      type:DataTypes.INTEGER,
    },
    language:{
      type:DataTypes.STRING,
    },
    description: {
      type:DataTypes.STRING
    },
    card_id:{
      type:DataTypes.STRING,
    },
    phone_number:{
      type:DataTypes.STRING,
    },
  }, {
    timestamp:true,
    createdAt:"created_at",
    updatedAt:"updated_at",
    tableName: 'users',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // User.hasMany(models.Packages);

      },

    }
  });
  return User;
};
