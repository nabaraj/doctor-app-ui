import { requestApi } from "../service/service";
import { AUTH_USER } from "../utils/utils";
import { urlMapping } from "../utils/url";

export function userLogin(loginObject) {
  return function (dispatch) {
    //dispatch({type:LOADING_STATUS, payload:options });
    // let usrToken = { Authorization: "Token " + getCookie("loginToken") };
    let options = {
      method: "POST",
      url: urlMapping["login"],
      data: loginObject,
    };
    dispatch({type:'LOGIN_LOADING'});
    requestApi(options)
      .then((result) => {
        window.localStorage.setItem('token',result.data.token)
        dispatch({ type: "SAVE_USER_DETAILS", payload: result.data });
        dispatch({type:'LOGIN_LOADING'});
        dispatch({type:'LOGIN_STATUS'});
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        // dispatch({ type: PRAIZING_LOGOUT });
        // dispatch({ type: REMOVE_USER_DETAILS });
      });
  };
}
export function getProfile(){
  return function(dispatch){
    let url =urlMapping["profile"]
    let profileOptions = {
      method: "GET",
      url,
      headers: AUTH_USER(),
    };
    // dispatch({type:'LOGIN_LOADING'});
    requestApi(profileOptions)
      .then((result) => {
        // window.localStorage.setItem('token',result.data.token)
        dispatch({ type: "SAVE_USER_DETAILS", payload: result.data });
        // dispatch({type:'LOGIN_LOADING'});
        dispatch({type:'LOGIN_STATUS'});
      })
      .catch((error) => {
        console.log(error);
        console.log(JSON.stringify(error));
        // dispatch({ type: PRAIZING_LOGOUT });
        // dispatch({ type: REMOVE_USER_DETAILS });
      });
  }
}
export function profileLogout(){
  return function(dispatch){
    let url =urlMapping["logout"]
    let profileOptions = {
      method: "GET",
      url,
      headers: AUTH_USER(),
    };
    requestApi(profileOptions)
      .then((result) => {
        dispatch({ type: "RESET_LOGIN" });
      })
      .catch((error) => {
        dispatch({ type: "RESET_LOGIN" });
      });
  }
}
export function resetLogin(){
  return function(dispatch){
    dispatch({type:'RESET_LOGIN'})
  }
}