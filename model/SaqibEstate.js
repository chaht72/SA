/**
 * SaqibEstate.js
 * @description :: sequelize model of database table SaqibEstate
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const bcrypt = require('bcrypt');
let SaqibEstate = sequelize.define('SaqibEstate',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  userType:{ type:DataTypes.INTEGER },
  email:{ type:DataTypes.STRING },
  mobileNo:{ type:DataTypes.STRING },
  username:{ type:DataTypes.STRING },
  password:{ type:DataTypes.STRING },
  googleId:{ type:DataTypes.STRING },
  facebookId:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (SaqibEstate,options){
        if (SaqibEstate.password){ SaqibEstate.password =
          await bcrypt.hash(SaqibEstate.password, 8);}
        SaqibEstate.isActive = true;
        SaqibEstate.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (SaqibEstate,options){
        if (SaqibEstate !== undefined && SaqibEstate.length) { 
          for (let index = 0; index < SaqibEstate.length; index++) { 
            const element = SaqibEstate[index];
            if (element.password){ 
              element.password = await bcrypt.hash(element.password, 8);
            }
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
    afterCreate: [
      async function (SaqibEstate,options){
        sequelize.model('userAuthSettings').create({ userId:SaqibEstate.id });
      },
    ],
  }
}
);
SaqibEstate.prototype.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
SaqibEstate.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  if (values.isDeleted){
    values.isDeleted = '1';
  } else {
    values.isDeleted = '9';
  }
  if (values.isActive){
    values.isActive = '1';
  } else {
    values.isActive = '9';
  }
  delete values.password;
  return values;
};
sequelizeTransforms(SaqibEstate);
sequelizePaginate.paginate(SaqibEstate);
module.exports = SaqibEstate;
