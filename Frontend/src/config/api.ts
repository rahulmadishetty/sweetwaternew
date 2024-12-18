import axios from 'axios';

// Create an Axios instance with a base configuration
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Base URL for all API endpoints
  timeout: 5000, // Timeout for requests (5 seconds)
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
});

// Add a request interceptor (optional)
api.interceptors.request.use(
  (config) => {
    // Modify or add headers (e.g., Authorization token) before the request is sent
    // Example: config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Add a response interceptor (optional)
api.interceptors.response.use(
  (response) => response, // Return response data directly
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error); // Handle response errors globally
  }
);

export default api;
