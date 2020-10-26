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
    dispatch({type:'HISTORY_LOADER'})
    requestApi(getHistoryObject)
    .then(res=>{
      dispatch({type:'HISTORY_LOADER'})
      dispatch({type:'STORE_USER_HISTORY', payload: res.data})
    })
    .catch(error=>{
      dispatch({type:'HISTORY_LOADER'})
      dispatch({ type: "STORE_USER_HISTORY", payload: {'error':"No history found"} });
    })
  }
}
export function searchPatient(pageSize, str, nextPage){
  return function(dispatch){
    let searchObject = {
      url:`${urlMapping['search']}/${nextPage}/?searchStr=${str}&pageSize=${pageSize}`,
      method: 'GET',
      headers: AUTH_USER()
    }
    dispatch({type:'SEARCH_LOADER'})
    requestApi(searchObject)
    .then(res=>{
      res.data["searchText"] = str;
      dispatch({type:'SEARCH_RESULT_ADD', payload:res.data})
      dispatch({type:'SEARCH_LOADER'})
    })
    .catch(err=>{
      dispatch({ type: "SEARCH_RESULT_ADD", payload: {'error':"No result found"} })
      dispatch({type:'SEARCH_LOADER'})
    })
  }
}
export function loadMore(pageSize, str, nextPageUrl){
  return function(dispatch){
    let searchObject = {
      url:`${urlMapping['base']}/${nextPageUrl}/?searchStr=${str}&pageSize=${pageSize}`,
      method: 'GET',
      headers: AUTH_USER()
    }
    dispatch({type:'LOADMORE_LOADER'})
    requestApi(searchObject)
    .then(res=>{
      res.data["searchText"] = str;
      dispatch({type:'SEARCH_RESULT_LOADMORE', payload:res.data})
      dispatch({type:'LOADMORE_LOADER'})
    })
    .catch(err=>{

      dispatch({ type: "SEARCH_RESULT_ADD", payload: {'error':"No result found"} })
      dispatch({type:'LOADMORE_LOADER'})
    })
  }
}
export function submitPrescription(prescriptionForm){
  return function(dispatch){
    let searchObject = {
      url:`${urlMapping['postPrescription']}`,
      method: 'POST',
      data:prescriptionForm,
      headers: AUTH_USER()
    }
    dispatch({type:'PRESCRIPTION_LOADER'})
    requestApi(searchObject)
    .then(res=>{
      dispatch({type:'PRESCRIPTION_SAVE', payload:res.data.presData})
      dispatch({type:'PRESCRIPTION_LOADER'})
    })
    .catch(err=>{
      dispatch({ type: "PRESCRIPTION_SAVE", payload: {'error':"No result found"} })
      dispatch({type:'PRESCRIPTION_LOADER'})
    })
  }
}
export function editPrescription(prescriptionForm){
  return function(dispatch){
    let searchObject = {
      url:`${urlMapping['postPrescription']}`,
      method: 'PUT',
      data:prescriptionForm,
      headers: AUTH_USER()
    }
    dispatch({type:'PRESCRIPTION_LOADER'})
    requestApi(searchObject)
    .then(res=>{
      dispatch({type:'PRESCRIPTION_SAVE', payload:res.data.presData})
      dispatch({type:'PRESCRIPTION_LOADER'})
    })
    .catch(err=>{
      dispatch({ type: "PRESCRIPTION_SAVE", payload: {'error':"No result found"} })
      dispatch({type:'PRESCRIPTION_LOADER'})
    })
  }
}