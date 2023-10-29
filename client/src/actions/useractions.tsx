import axios from "axios";

export const GET_LIST_HOME = "GET_LIST_HOME";
export const GET_LIST_POSTING = "GET_LIST_POSTING";
export const GET_LIST_USER = "GET_LIST_USER";

export const getlisthome = () => {
  return (distpatch: any) => {
    distpatch({
      type: GET_LIST_HOME,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: `http://localhost:3001/profil/9`,
      timeout: 12000,
    })
      .then((response) => {
        distpatch({
          type: GET_LIST_HOME,
          payload: {
            loading: false,
            data: response.data.data_codigram,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log("4. Gagal dapat data :", error);
        distpatch({
          type: GET_LIST_HOME,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
export const getlistposting = () => {
  // console.log("2. Berhasil");
  const token = localStorage.getItem("access_token");
  return (distpatch: any) => {
    distpatch({
      type: GET_LIST_POSTING,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: `http://localhost:3001/home`,
      timeout: 12000,
      headers: {
        access_token: token,
      },
    })
      .then((response) => {
        // console.log("3. berhasil  data :", response.data.data_codigram);
        distpatch({
          type: GET_LIST_POSTING,
          payload: {
            loading: false,
            data: response.data.data_codigram,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log("4. Gagal dapat data :", error);
        distpatch({
          type: GET_LIST_POSTING,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
export const getlistuser = () => {
  console.log("2. Berhasil");
  return (distpatch: any) => {
    distpatch({
      type: GET_LIST_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: `http://localhost:3001/listuser`,
      timeout: 12000,
    })
      .then((response) => {
        console.log("3. berhasil  data :", response.data.data_codigram);
        distpatch({
          type: GET_LIST_USER,
          payload: {
            loading: false,
            data: response.data.data_codigram,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log("4. Gagal dapat data :", error);
        distpatch({
          type: GET_LIST_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
