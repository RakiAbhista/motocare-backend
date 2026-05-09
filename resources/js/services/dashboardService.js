import axios from 'axios';

const API_BASE_URL = '/api/v1';

const dashboardService = {
  /**
   * Fetch dashboard data from backend
   * @param {string} range - Time range: '1_week', '1_month', '3_months', '6_months', '1_year'
   * @returns {Promise} Dashboard data
   */
  getDashboardData: async (range = '1_month') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
        params: { range },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  /**
   * Fetch all users (customers)
   */
  getUsers: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Create new user
   */
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update user
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  /**
   * Delete user
   */
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  /**
   * Fetch all workshops
   */
  getWorkshops: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/workshops`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching workshops:', error);
      throw error;
    }
  },

  /**
   * Create new workshop
   */
  createWorkshop: async (workshopData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/workshops`, workshopData);
      return response.data;
    } catch (error) {
      console.error('Error creating workshop:', error);
      throw error;
    }
  },

  /**
   * Update workshop
   */
  updateWorkshop: async (workshopId, workshopData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/workshops/${workshopId}`, workshopData);
      return response.data;
    } catch (error) {
      console.error('Error updating workshop:', error);
      throw error;
    }
  },

  /**
   * Delete workshop
   */
  deleteWorkshop: async (workshopId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/workshops/${workshopId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting workshop:', error);
      throw error;
    }
  },

  /**
   * Fetch all services
   */
  getServices: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/services`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  /**
   * Create new service
   */
  createService: async (serviceData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/services`, serviceData);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  /**
   * Update service
   */
  updateService: async (serviceId, serviceData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/services/${serviceId}`, serviceData);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  /**
   * Delete service
   */
  deleteService: async (serviceId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/services/${serviceId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  /**
   * Fetch all vehicles
   */
  getVehicles: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/vehicles`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },

  /**
   * Fetch all orders
   */
  getOrders: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/orders`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  /**
   * Get order detail by ID
   */
  getOrderDetail: async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order detail:', error);
      throw error;
    }
  },
};

export default dashboardService;
