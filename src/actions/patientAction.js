import { requestApi } from "../service/service";
import { AUTH_USER } from "../utils/utils";
import { urlMapping } from "../utils/url";

export function patientRegistration(patientFormData) {
  return function (dispatch) {
    let options = {
      method: "POST",
      url: urlMapping["patientRegistration"],
      data: patientFormData,
      headers: AUTH_USER()
    };
    requestApi(options)
      .then((result) => {
        dispatch({ type: "SAVE_PATIENT_DETAILS", payload: result.data });
      })
      .catch((error, res) => {
        console.table(JSON.stringify(error));
        // dispatch({ type: "SAVE_PATIENT_DETAILS", payload: result.data });
      });
  };
}
export function patientDetails(patientId) {
  return function (dispatch) {
    //dispatch({type:LOADING_STATUS, payload:options });
    // let usrToken = { Authorization: "Token " + getCookie("loginToken") };
    let options = {
      method: "GET",
      url: urlMapping["patientDetails"]+"/?patientId="+patientId,
      headers: AUTH_USER()
    };
    // dispatch({type:'LOGIN_LOADING'});
    requestApi(options)
      .then((result) => {
        console.log("patient details ",result.data);
        dispatch({ type: "SAVE_PATIENT_DETAILS", payload: result.data });
        // dispatch({type:'LOGIN_LOADING'});
        // dispatch({type:'LOGIN_STATUS'});
      })
      .catch((error) => {
        dispatch({ type: "SAVE_PATIENT_DETAILS", payload: {'error':"No match found"} });
        // console.log(JSON.stringify(error));
        // dispatch({ type: PRAIZING_LOGOUT });
        // dispatch({ type: REMOVE_USER_DETAILS });
      });
  };
}
export function clearPatientDetails(){
  return function (dispatch){
    dispatch({type:'CLEAR_PATIENT_DETAILS'})
  }
}
