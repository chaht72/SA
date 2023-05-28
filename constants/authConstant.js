/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  ADMIN_SECRET:'myjwtadminsecret',
  DEVICE_SECRET:'myjwtdevicesecret',
  DESKTOP_SECRET:'myjwtdesktopsecret',
  CLIENT_SECRET:'myjwtclientsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  User:1,
  Admin:2,
};

const PLATFORM = {
  ADMIN:1,
  DEVICE:2,
  DESKTOP:3,
  CLIENT:4,
};

let LOGIN_ACCESS = {
  [USER_TYPES.User]:[PLATFORM.ADMIN,PLATFORM.DEVICE,PLATFORM.DESKTOP,PLATFORM.CLIENT],        
  [USER_TYPES.Admin]:[PLATFORM.ADMIN,PLATFORM.DEVICE,PLATFORM.DESKTOP,PLATFORM.CLIENT],        
};

const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 20;   

const SEND_LOGIN_OTP = { EMAIL:1, };
const DEFAULT_SEND_LOGIN_OTP = SEND_LOGIN_OTP.EMAIL;

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: true
  }
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  SEND_LOGIN_OTP,
  DEFAULT_SEND_LOGIN_OTP,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
};