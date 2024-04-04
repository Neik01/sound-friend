import axios from "axios";
import { storageToken } from "./storage";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
});

request.interceptors.request.use(
  async (config) => {
    const session = await storageToken.get();

    if (!!session?.token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session?.token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// response parse
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        const config = error?.config;
        if (!!storageToken.get().token) {
          storageToken.set({});
        }
        document.location.href = "/";
        return request(config);
      }
      return Promise.reject(error);
    }
  }
);

export default request;
