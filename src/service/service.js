import axios from "axios";

export const requestApi = function (options) {
  let finalOptions = Object.assign({}, options);

  let axiosInstance = axios(finalOptions);
  axiosInstance.catch((error) => {
    if (axios.isCancel()) {
      console.log("@@@@##### Request canceled");
    }
  });
  //axios.cancel(requestId);
  return axiosInstance;
};
