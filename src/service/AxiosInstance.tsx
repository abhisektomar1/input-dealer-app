import axios from 'axios';
import { BASE_URL_APP } from '../utils';

const axiosInstance = axios.create({
  baseURL: BASE_URL_APP,
});

// Interceptor to add the JWT token to every request
axiosInstance.interceptors.request.use((config) => {
  // Get the token from localStorage
  const token = localStorage.getItem("token");
  
  // If token exists, add it to the Authorization header
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error is due to an expired token (assuming your server returns a 401 status)
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Implement your token refresh logic here
//         // const refreshToken = localStorage.getItem('refreshToken');
//         // const response = await axios.post('/refresh-token', { refreshToken });
//         // const newToken = response.data.token;
//         // localStorage.setItem('token', newToken);

//         // Retry the original request with the new token
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh token failure (e.g., logout user, redirect to login)
//         console.error('Token refresh failed:', refreshError);
//         // Implement logout logic here
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );


export default axiosInstance;