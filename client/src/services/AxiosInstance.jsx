import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Perform actions before the request is sent
    return config;
  },
  error => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Perform actions on the response data
    return response;
  },
  error => {
    // Handle the response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
