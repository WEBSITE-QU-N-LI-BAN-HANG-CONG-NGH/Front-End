// src/services/adminService.js
import API from '../api/axiosConfig';

const adminService = {
  // Quản lý người dùng
  getAllUsers: async (page = 0, size = 10, search = '', role = '') => {
    const response = await API.get(`/admin/users/all`, {
      params: { page, size, search, role }
    });
    return response.data;
  },
  
  getUserById: async (userId) => {
    const response = await API.get(`/admin/users/${userId}`);
    return response.data;
  },
  
  changeUserRole: async (userId, role) => {
    const response = await API.put(`/admin/users/${userId}/change-role`, { role });
    return response.data;
  },
  
  updateUserStatus: async (userId, active) => {
    const response = await API.put(`/admin/users/${userId}/status`, { active });
    return response.data;
  },
  
  deleteUser: async (userId) => {
    const response = await API.delete(`/admin/users/${userId}`);
    return response.data;
  },
  
  // Dashboard
  getDashboardOverview: async () => {
    const response = await API.get(`/admin/dashboard/overview`);
    return response.data;
  },
  
  getRevenue: async () => {
    const response = await API.get(`/admin/dashboard/revenue`);
    return response.data;
  },
  
  getTopSellers: async () => {
    const response = await API.get(`/admin/dashboard/top-sellers`);
    return response.data;
  },
  
  getRevenueDistribution: async () => {
    const response = await API.get(`/admin/dashboard/revenue-distribution`);
    return response.data;
  }
};

export default adminService;