import {
  GET_LIST_HOME,
  GET_LIST_POSTING,
  GET_LIST_USER,
} from "../../actions/useractions";

const initialState = {
  getlisthomeResult: false,
  getlisthomeLoading: false,
  getlisthomeError: false,

  getlistpostingResult: false,
  getlistpostingLoading: false,
  getlistpostingError: false,

  getlistuserResult: false,
  getlistuserLoading: false,
  getlistuserError: false,
};
const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_LIST_HOME:
      // console.log("4. Masuk Reducer :", action);
      return {
        ...state,
        getlisthomeResult: action.payload.data,
        getlisthomeLoading: action.payload.loading,
        getlisthomeError: action.payload.errorMessage,
      };
    case GET_LIST_POSTING:
      // console.log("4. Masuk Reducer :", action);
      return {
        ...state,
        getlistpostingResult: action.payload.data,
        getlistpostingLoading: action.payload.loading,
        getlistpostingError: action.payload.errorMessage,
      };
    case GET_LIST_USER:
      console.log("4. Masuk Reducer :", action);
      return {
        ...state,
        getlistuserResult: action.payload.data,
        getlistuserLoading: action.payload.loading,
        getlistuserError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
export default usersReducer;
