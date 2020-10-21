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
export function getPatientDetails(patientId) {
  return function (dispatch) {
    let options = {
      method: "GET",
      url: urlMapping["patientDetails"]+"/?patientId="+patientId,
      headers: AUTH_USER()
    };
    requestApi(options)
      .then((result) => {
        dispatch({ type: "SAVE_PATIENT_DETAILS", payload: result.data });
      })
      .catch((error) => {
        dispatch({ type: "SAVE_PATIENT_DETAILS", payload: {'error':"No match found"} });
      });
  };
}
export function clearPatientDetails(){
  return function (dispatch){
    dispatch({type:'CLEAR_PATIENT_DETAILS'})
  }
}
export function getPatientHistory(pi, di){
  return function (dispatch){
    let getHistoryObject = {
      url: `${urlMapping['patientHistory']}/?patientId=${pi}&doctorId=${di}`,
      method: 'GET',
      headers: AUTH_USER()
    }
    requestApi(getHistoryObject)
    .then(res=>{
      dispatch({type:'STORE_USER_HISTORY', payload: res.data})
    })
    .catch(error=>{
      dispatch({ type: "STORE_USER_HISTORY", payload: {'error':"No history found"} });
    })
  }
}