import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import multi from "redux-multi";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
const middlewares = [];

middlewares.push(thunk);
// middlewares.push(multi);
if (process.env.NODE_ENV === `development`) {
  const { createLogger } = require(`redux-logger`);
  middlewares.push(
    createLogger({
      predicate: (getState, action) => {
        return (
          [
            // "MERGE_POST_MEDIA",
            // "MERGE_POST_MEDIA",
            // "MERGE_POST_COUNT",
            // "TRACKING_REQUEST",
            // "REMOVE_FROM_REQUESTS_ARR",
            // "MERGE_AUTHORS",
            // "SAVE_ALL_USERS",
            // "GET_POSTS_LISTS"
          ].indexOf(action.type) === -1
        );
      }
    })
  );
  // middlewares.push(createLogger({
  //   predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN
  // }));"MERGE_AUTHORS"
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;