import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user";
// import { combineReducers } from "redux";
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// const rootReducer = combineReducers({
//   todo: usersReducer,
// });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type RootStatee = ReturnType<typeof rootReducer>;
// export type AppDispatchh = typeof rootReducer.dispatch;
export default store;
