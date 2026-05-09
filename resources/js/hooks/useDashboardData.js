import { useState, useEffect } from 'react';
import dashboardService from '../services/dashboardService';

/**
 * Custom hook to manage dashboard data fetching and state
 */
export const useDashboardData = (range = '1_month') => {
  const [data, setData] = useState({
    statistics: {
      total_user: 0,
      total_mechanic: 0,
      order_today: 0,
      order_completed_today: 0,
    },
    chart_data: [],
    top_services: [],
    activities: [],
    recent_orders: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getDashboardData(range);
        if (response.status === 'success') {
          setData(response.data);
        }
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  return { data, loading, error };
};

/**
 * Custom hook to manage users data
 */
export const useUsersData = (page = 1, limit = 10) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: limit,
  });

  const fetchUsers = async (pageNum = page) => {
    try {
      setLoading(true);
      const response = await dashboardService.getUsers(pageNum, limit);
      setUsers(response.data || []);
      if (response.meta) {
        setPagination(response.meta);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page, limit]);

  return { users, loading, error, pagination, refetch: fetchUsers };
};

/**
 * Custom hook to manage workshops data
 */
export const useWorkshopsData = (page = 1, limit = 10) => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: limit,
  });

  const fetchWorkshops = async (pageNum = page) => {
    try {
      setLoading(true);
      const response = await dashboardService.getWorkshops(pageNum, limit);
      setWorkshops(response.data || []);
      if (response.meta) {
        setPagination(response.meta);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch workshops');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops(page);
  }, [page, limit]);

  return { workshops, loading, error, pagination, refetch: fetchWorkshops };
};

/**
 * Custom hook to manage services data
 */
export const useServicesData = (page = 1, limit = 10) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: limit,
  });

  const fetchServices = async (pageNum = page) => {
    try {
      setLoading(true);
      const response = await dashboardService.getServices(pageNum, limit);
      setServices(response.data || []);
      if (response.meta) {
        setPagination(response.meta);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(page);
  }, [page, limit]);

  return { services, loading, error, pagination, refetch: fetchServices };
};

/**
 * Custom hook to manage vehicles data
 */
export const useVehiclesData = (page = 1, limit = 10) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: limit,
  });

  const fetchVehicles = async (pageNum = page) => {
    try {
      setLoading(true);
      const response = await dashboardService.getVehicles(pageNum, limit);
      setVehicles(response.data || []);
      if (response.meta) {
        setPagination(response.meta);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch vehicles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles(page);
  }, [page, limit]);

  return { vehicles, loading, error, pagination, refetch: fetchVehicles };
};

/**
 * Custom hook to manage orders data
 */
export const useOrdersData = (page = 1, limit = 10) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: limit,
  });

  const fetchOrders = async (pageNum = page) => {
    try {
      setLoading(true);
      const response = await dashboardService.getOrders(pageNum, limit);
      setOrders(response.data || []);
      if (response.meta) {
        setPagination(response.meta);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page, limit]);

  return { orders, loading, error, pagination, refetch: fetchOrders };
};
