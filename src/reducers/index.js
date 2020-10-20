import { combineReducers } from "redux";
// import recentImagesReducer from "./smilieyReducer";
// import praizingLoginReducer from "./loginReducer";
// import shareBoxReducer from "./shareBoxReducer";
// import notificationReducer from "./notificationReducer";
// import loadingReducer from "./loadingReducer";
import userReducers from "./user";
import patientReducer from "./../pages/DisplayPatient/patientReducer";
// import postCORS from "./postReducer";
// import cateGoryReducer from "./categoriesReducer";
// import sideBarReducer from "./sidebarReducer";
// import joiningReducer from "./joinReducer";

const appReducer = combineReducers({ 
  userData: userReducers,
  patientData: patientReducer
});

const rootReducer = (state, action) => {
  // console.log("rootReducer", state, action);
  // if (action.type === "PRAIZING_LOGOUT") {
  //   state.userData = {};
  // }
  //places for clear store
  return appReducer(state, action);
};
export default rootReducer;
