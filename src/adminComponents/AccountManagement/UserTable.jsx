// src/adminComponents/AccountManagement/UserTable.jsx
"use client";
import React from "react";
import SearchBar from "../shared/SearchBar";
import Pagination from "./Pagination";

const UserTableHeader = () => (
  <div className="grid px-4 py-3 font-medium text-gray-600 bg-gray-50 border-t border-solid grid-cols-[40px_2fr_2fr_1fr_1fr_1fr_80px] max-sm:text-sm max-sm:grid-cols-[40px_2fr_2fr_1fr]">
    <div>
      <input type="checkbox" />
    </div>
    <div>Tên</div>
    <div>Email</div>
    <div>Vai trò</div>
    <div>Trạng thái</div>
    <div>Ngày tạo</div>
    <div>Thao tác</div>
  </div>
);

const UserTableRow = ({ user, onChangeStatus, onChangeRole, onDeleteUser }) => (
  <div className="grid items-center p-4 border-t border-solid grid-cols-[40px_2fr_2fr_1fr_1fr_1fr_80px] max-sm:text-sm max-sm:grid-cols-[40px_2fr_2fr_1fr]">
    <div>
      <input type="checkbox" />
    </div>
    <div className="flex gap-3 items-center">
      <div className="w-8 h-8 font-medium text-white bg-blue-600 rounded-[full] flex items-center justify-center">
        {user.firstName?.[0] || user.email?.[0] || 'U'}
      </div>
      <span>{`${user.firstName || ''} ${user.lastName || ''}`}</span>
    </div>
    <div>{user.email}</div>
    <div className="px-2 py-1 text-xs rounded">
      <select 
        value={user.role} 
        onChange={(e) => onChangeRole(user.id, e.target.value)}
        className="p-1 border rounded"
      >
        <option value="ADMIN">Admin</option>
        <option value="SELLER">Seller</option>
        <option value="CUSTOMER">Customer</option>
      </select>
    </div>
    <div className="px-2 py-1 text-xs rounded">
      <span 
        className={`px-2 py-1 rounded ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        onClick={() => onChangeStatus(user.id, !user.active)}
        style={{ cursor: 'pointer' }}
      >
        {user.active ? 'Hoạt động' : 'Đã khóa'}
      </span>
    </div>
    <div>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</div>
    <div className="flex justify-center">
      <div className="relative group">
        <i className="ti ti-dots-vertical cursor-pointer" />
        <div className="absolute right-0 hidden bg-white shadow-lg rounded p-2 z-10 w-36 group-hover:block">
          <button className="block w-full text-left p-2 hover:bg-gray-100 text-sm" onClick={() => alert(`Xem chi tiết: ${user.id}`)}>
            <i className="ti ti-eye mr-2"></i> Xem chi tiết
          </button>
          <button className="block w-full text-left p-2 hover:bg-gray-100 text-sm" onClick={() => onDeleteUser(user.id)}>
            <i className="ti ti-trash mr-2"></i> Xóa tài khoản
          </button>
        </div>
      </div>
    </div>
  </div>
);

const UserTable = ({ 
  users, 
  loading, 
  pagination,
  onPageChange,
  onSearch,
  onSearchChange,
  onRoleFilter,
  onChangeStatus,
  onChangeRole,
  onDeleteUser
}) => {
  return (
    <section className="bg-white rounded-lg border border-solid">
      <div className="">
        <div className="flex justify-between p-4 mb-4">
          <div className="flex items-center">
            <SearchBar
              placeholder="Tìm kiếm tài khoản..."
              className="w-[300px] max-md:w-60 max-sm:w-40"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
            <button 
              onClick={onSearch}
              className="ml-2 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
            >
              Tìm
            </button>
          </div>
          <div className="flex gap-2 items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer">
            <select 
              className="bg-transparent border-none focus:outline-none" 
              onChange={(e) => onRoleFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="ADMIN">Admin</option>
              <option value="SELLER">Seller</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>
        </div>
        <UserTableHeader />
      </div>

      {loading ? (
        <div className="text-center p-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div>
          {users.length > 0 ? (
            users.map((user) => (
              <UserTableRow 
                key={user.id} 
                user={user} 
                onChangeStatus={onChangeStatus}
                onChangeRole={onChangeRole}
                onDeleteUser={onDeleteUser}
              />
            ))
          ) : (
            <div className="text-center p-10 text-gray-500">
              Không có người dùng nào
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center p-4 border-t border-solid">
        <div className="text-sm text-gray-500">
          Hiển thị {users.length} trên tổng số {pagination.totalElements} tài khoản
        </div>
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
};

export default UserTable;