// SAVE_PATIENT_DETAILS// import * as types from "./../actions/types";
// SAVE_USER_DETAILS
let initialValue = {
  patientDetails:{},
  patientHistory:null,
  searchData:{},
  searchLoading:false,
  loadMoreLoading:false,
  prescription:{}
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
    case 'SEARCH_RESULT_ADD':
      return Object.assign({}, state, {searchData:{...action.payload}})
    case 'PRESCRIPTION_SAVE':
      return Object.assign({}, state, {prescription:{...action.payload}})
    case 'SEARCH_RESULT_LOADMORE':
      return Object.assign({}, state, 
        {searchData:mergePatientData(state.searchData, action.payload)
         })
    case 'SEARCH_LOADER':
      let loading = state.searchLoading;
      return Object.assign({}, state, {searchLoading:!loading})
    case 'LOADMORE_LOADER':
      let loadMore = state.loadMoreLoading;
      return Object.assign({}, state, {loadMoreLoading:!loadMore})
    default:
      return state;
  }
  return state;
};

export default patientReducer;

function mergePatientData(searchData, payload){
  let updatedData = searchData
  updatedData.nextLink = payload.nextLink;
  updatedData.results = [...payload.results, ...updatedData.results];
  return updatedData
}
