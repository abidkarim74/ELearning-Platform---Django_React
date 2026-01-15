import apiRequest from "./axiosInstance";


export const postRequest = async (endpoint: string, data: any) => {
  const response = await apiRequest.post(endpoint, data);
  return response;
}


export const getRequest = async (endpoint: string) => {
  const response = await apiRequest.get(endpoint);
  return response;
}


export const patchRequest = async (endpoint: string, data: any) => {
  const response = await apiRequest.patch(endpoint, data);
  return response;
}

export const deleteRequest = async (endpoint: string) => {
  const response = await apiRequest.delete(endpoint);
  return response;
}