/**
 * userTokens.js
 * @description :: sequelize model of database table userTokens
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let UserTokens = sequelize.define('userTokens',{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  userId:{ type:DataTypes.INTEGER },
  token:{ type:DataTypes.STRING },
  tokenExpiredTime:{ type:DataTypes.DATE },
  isTokenExpired:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  isActive:{ type:DataTypes.BOOLEAN },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (userTokens,options){
        userTokens.isActive = true;
        userTokens.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (userTokens,options){
        if (userTokens !== undefined && userTokens.length) { 
          for (let index = 0; index < userTokens.length; index++) { 
        
            const element = userTokens[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
UserTokens.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  if (values.isTokenExpired){
    values.isTokenExpired = '1';
  } else {
    values.isTokenExpired = '9';
  }
  if (values.isActive){
    values.isActive = '1';
  } else {
    values.isActive = '9';
  }
  if (values.isDeleted){
    values.isDeleted = '1';
  } else {
    values.isDeleted = '9';
  }
  return values;
};
sequelizeTransforms(UserTokens);
sequelizePaginate.paginate(UserTokens);
module.exports = UserTokens;
