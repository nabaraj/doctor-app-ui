// SAVE_PATIENT_DETAILS// import * as types from "./../actions/types";
// SAVE_USER_DETAILS
let initialValue = {
  patientDetials:{},
}
const patientReducer = (
  state = initialValue,
  action
) => {
  switch (action.type) {
    case 'SAVE_PATIENT_DETAILS':
      return Object.assign({}, state, {patientDetials:{ ...action.payload }})
    case 'CLEAR_PATIENT_DETAILS':
      return Object.assign({}, state, initialValue)
    default:
      return state;
  }
  return state;
};

export default patientReducer;
