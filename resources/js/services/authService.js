import axios from 'axios';

const API_BASE_URL = '/api/v1/auth';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', response.data.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  register: async (name, email, password, passwordConfirmation, role) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', response.data.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  verifyOtp: async (email, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, {
        email,
        token,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  resetPassword: async (email, token, password, passwordConfirmation) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post(`${API_BASE_URL}/logout`);
      }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      delete axios.defaults.headers.common['Authorization'];
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      throw error;
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getRole: () => {
    return localStorage.getItem('role');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
