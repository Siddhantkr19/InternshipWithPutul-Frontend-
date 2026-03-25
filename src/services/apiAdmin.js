import axios from 'axios';

const apiAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. REQUEST INTERCEPTOR: Attach the token before sending
apiAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Must include 'Bearer '
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR: Handle 401/403 errors
apiAdmin.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Token is actually dead -> Log out
        console.warn("Session expired. Logging out...");
        localStorage.removeItem('jwtToken');
        window.location.href = '/login'; 
      } 
      else if (error.response.status === 403) {
        // Token is valid, but wrong role -> Send to home page
        console.warn("Forbidden: You do not have Admin access.");
        window.location.href = '/'; 
      }
    }
    return Promise.reject(error);
  }
);

export default apiAdmin;