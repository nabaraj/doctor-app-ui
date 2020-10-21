// SAVE_PATIENT_DETAILS// import * as types from "./../actions/types";
// SAVE_USER_DETAILS
let initialValue = {
  patientDetails:{},
  patientHistory:null
}
const patientReducer = (
  state = initialValue,
  action
) => {
  switch (action.type) {
    case 'SAVE_PATIENT_DETAILS':
      return Object.assign({}, state, {patientDetails:{ ...action.payload }})
    case 'CLEAR_PATIENT_DETAILS':
      return Object.assign({}, state, initialValue)
    case 'STORE_USER_HISTORY':
      return Object.assign({}, state, {patientHistory:{...action.payload}})
    default:
      return state;
  }
  return state;
};

export default patientReducer;
