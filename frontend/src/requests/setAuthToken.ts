import apiRequest from "./axiosInstance";


export const setAuthorizationHeaderToken = (token: string | null) => {
  if(token) {
    apiRequest.defaults.headers.common.Authorization = `Bearer ${token}`;

  } else {
    delete apiRequest.defaults.headers.common.Authorization;
  }
}