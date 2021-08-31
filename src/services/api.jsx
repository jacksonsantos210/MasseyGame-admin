import axios from "axios";
import { toast } from "react-toastify";

import { ServerURI } from "@/configs/constants";

const api = axios.create({
  baseURL: ServerURI,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

/* api.interceptors.request.use(async (config) => {
  const token = API_TOKEN; //getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); */

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      toast.error("O tempo de sua seção expirou, faça login novamente.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;