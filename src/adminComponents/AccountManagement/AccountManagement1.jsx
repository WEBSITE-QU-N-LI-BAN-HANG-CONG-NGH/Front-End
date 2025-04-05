// src/adminComponents/AccountManagement/AccountManagement1.jsx
"use client";
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import TabNavigation from "./TabNavigation";
import UserTable from "./UserTable";
import adminService from "../../services/adminService";

const PageHeader = () => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-gray-900">
        Quản lý tài khoản
      </h1>
      <p className="text-sm text-gray-500">
        Quản lý người dùng, phân quyền và xử lý báo cáo
      </p>
    </div>
    <button className="flex gap-2 items-center px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer border-none hover:bg-blue-700">
      <i className="ti ti-plus" />
      <span>Thêm tài khoản</span>
    </button>
  </div>
);

const AccountManagement1 = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0
  });
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await adminService.getAllUsers(
        pagination.page,
        pagination.size,
        search,
        role
      );
      setUsers(result.content);
      setPagination({
        page: result.number,
        size: result.size,
        totalPages: result.totalPages,
        totalElements: result.totalElements
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.size, role]);

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 0 }));
    fetchUsers();
  };

  const handleChangeStatus = async (userId, active) => {
    try {
      await adminService.updateUserStatus(userId, active);
      fetchUsers();
    } catch (err) {
      setError("Không thể cập nhật trạng thái người dùng");
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await adminService.changeUserRole(userId, newRole);
      fetchUsers();
    } catch (err) {
      setError("Không thể thay đổi vai trò người dùng");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await adminService.deleteUser(userId);
        fetchUsers();
      } catch (err) {
        setError("Không thể xóa người dùng");
      }
    }
  };

  return (
    <Layout>
      <PageHeader />
      <TabNavigation />
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <UserTable 
        users={users} 
        loading={loading}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        onSearch={handleSearch}
        onSearchChange={setSearch}
        onRoleFilter={setRole}
        onChangeStatus={handleChangeStatus}
        onChangeRole={handleChangeRole}
        onDeleteUser={handleDeleteUser}
      />
    </Layout>
  );
};

export default AccountManagement1;