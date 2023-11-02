import {
  GET_LIST_HOME,
  GET_LIST_POSTING,
  GET_LIST_USER,
  GET_LIST_USER_POST,
  GET_LIST_DETAILP,
  GET_LIST_POSTSEARCH,
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

  getlistuserposResult: false,
  getlistuserposLoading: false,
  getlistuserposError: false,

  getlistdetailResult: false,
  getlistdetailLoading: false,
  getlistdetailError: false,

  getlistsearchResult: false,
  getlistsearchLoading: false,
  getlistsearchError: false,
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
      // console.log("4. Masuk Reducer :", action);
      return {
        ...state,
        getlistuserResult: action.payload.data,
        getlistuserLoading: action.payload.loading,
        getlistuserError: action.payload.errorMessage,
      };
    case GET_LIST_USER_POST:
      // console.log("4. Masuk Reducer :", action);
      return {
        ...state,
        getlistuserposResult: action.payload.data,
        getlistuserposLoading: action.payload.loading,
        getlistuserposError: action.payload.errorMessage,
      };
    case GET_LIST_DETAILP:
      // console.log("4. Masuk Reducer :", action);
      return {
        ...state,
        getlistdetailResult: action.payload.data,
        getlistdetailLoading: action.payload.loading,
        getlistdetailError: action.payload.errorMessage,
      };
    case GET_LIST_POSTSEARCH:
      // console.log("4. Masuk Reducer :", action);
      return {
        ...state,
        getlistsearchResult: action.payload.data,
        getlistsearchLoading: action.payload.loading,
        getlistsearchError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
export default usersReducer;
