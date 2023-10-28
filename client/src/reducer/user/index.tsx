import { GET_LIST_HOME, GET_LIST_POSTING } from "../../actions/useractions";

const initialState = {
  getlisthomeResult: false,
  getlisthomeLoading: false,
  getlisthomeError: false,

  getlistpostingResult: false,
  getlistpostingLoading: false,
  getlistpostingError: false,
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
      console.log("4. Masuk Reducer :", action);
      return {
        ...state,
        getlistpostingResult: action.payload.data,
        getlistpostingLoading: action.payload.loading,
        getlistpostingError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};
export default usersReducer;
