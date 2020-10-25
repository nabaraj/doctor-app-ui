// import * as types from "./../actions/types";
// SAVE_USER_DETAILS
let initialValue = {
  userLoggedIn: false,
  loginLoading:false,
  user: {}
}
const userReducers = (
  state = initialValue,
  action
) => {
  switch (action.type) {
    case "SAVE_USER_DETAILS":
      return Object.assign({}, state, {
        user: {...action.payload} });
    case "LOGIN_LOADING":
      let isLoading = state.loginLoading;
      return Object.assign({}, state, { loginLoading: !isLoading });
    case "LOGIN_STATUS":
      return Object.assign({}, state, { userLoggedIn: true });
    case "RESET_LOGIN":
      window.localStorage.clear();
      return Object.assign({}, state, initialValue)
    // case 'SAVE_PATIENT_DETAILS':
    //   return Object.assign({}, state, {patientDetails:{ ...action.payload }})
    // case types.REMOVE_USER_DETAILS:
    //   return Object.assign({}, state, {});
    // case types.HEADER_IMAGE_LOADER:
    //   return Object.assign({}, state, { ...action.payload });
    // case types.UPDATE_USER:
    //   return Object.assign({}, state, { ...action.payload });
    // case types.OPEN_EDIT_PROFILE:
    //   return Object.assign({}, state, { openEditProfile: action.payload });
    // case types.SAVE_ALL_USERS:
    //   return Object.assign({}, state, { allUsers: action.payload });
    default:
      return state;
  }
  // return state;
};

export default userReducers;
