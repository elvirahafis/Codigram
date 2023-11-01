import axios from "axios";

export const GET_LIST_HOME = "GET_LIST_HOME";
export const GET_LIST_POSTING = "GET_LIST_POSTING";
export const GET_LIST_USER = "GET_LIST_USER";
export const GET_LIST_USER_POST = "GET_LIST_USER_POST";
export const GET_LIST_DETAILP = "GET_LIST_DETAILP";

export const getlistuserpost = (userId: any) => {
  // console.log(userId, "userid");
  return (distpatch: any) => {
    distpatch({
      type: GET_LIST_USER_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: `http://localhost:3001/listpostinguser/${userId}`,
      timeout: 12000,
    })
      .then((response) => {
        // console.log("3. data :", response.data);
        distpatch({
          type: GET_LIST_USER_POST,
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
          type: GET_LIST_USER_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
export const getlisthome = (userId: any) => {
  // console.log(userId, "userid");
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
      url: `http://localhost:3001/profil/${userId}`,
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
  // console.log("2. Berhasil");
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
        // console.log("3. berhasil  data :", response.data.data_codigram);
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
export const getdetailuser = (id: any) => {
  return (distpatch: any) => {
    distpatch({
      type: GET_LIST_DETAILP,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: `http://localhost:3001/profil/${id}`,
      timeout: 12000,
    })
      .then((response) => {
        // console.log("3. berhasil  data :", response.data.data_codigram);
        distpatch({
          type: GET_LIST_DETAILP,
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
          type: GET_LIST_DETAILP,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
