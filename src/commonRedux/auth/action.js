import {
    LOGIN,
    SAVEDATA,
    LOGOUT,
    FORGET_PASSWORD,
    GET_APP_STATE,
  } from './constant';
  
  export default class AuthActions {
    static loginSucess(payload,token) {
      return {
        type: LOGIN.SUCCESS,
        payload,
        token,
      };
    }
  
    static loginFail(payload) {
      return {
        type: LOGIN.FAIL,
        payload,
      };
    }
    static logout( ) {
      return {
        type:  LOGOUT.SUCCESS ,
      
      };
    }
    
    static saveDataSuccess(payload) {
      return {
        type: SAVEDATA.SUCCESS,
        payload,
      };
    }
  }
  