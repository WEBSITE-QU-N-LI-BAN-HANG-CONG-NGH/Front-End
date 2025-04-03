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

const UserTableRow = ({ user }) => (
  <div className="grid items-center p-4 border-t border-solid grid-cols-[40px_2fr_2fr_1fr_1fr_1fr_80px] max-sm:text-sm max-sm:grid-cols-[40px_2fr_2fr_1fr]">
    <div>
      <input type="checkbox" />
    </div>
    <div className="flex gap-3 items-center">
      <div className="w-8 h-8 font-medium text-white bg-indigo-600 rounded-[full] flex items-center justify-center">
        {user.name[0]}
      </div>
      <span>{user.name}</span>
    </div>
    <div>{user.email}</div>
    <div className="px-2 py-1 text-xs rounded">{user.role}</div>
    <div className="px-2 py-1 text-xs rounded">{user.status}</div>
    <div>{user.createdAt}</div>
    <div className="flex justify-center">
      <i className="ti ti-dots-vertical cursor-pointer" />
    </div>
  </div>
);

const UserTable = ({ users }) => {
  return (
    <section className="bg-white rounded-lg border border-solid">
      <div className="">
        <div className="flex justify-between p-4 mb-4">
          <SearchBar
            placeholder="Tìm kiếm tài khoản..."
            className="w-[300px] max-md:w-60 max-sm:w-40"
          />
          <div className="flex gap-2 items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer">
            <span>Tất cả</span>
            <i className="ti ti-chevron-down" />
          </div>
        </div>
        <UserTableHeader />
      </div>

      <div>
        {users.map((user, index) => (
          <UserTableRow key={index} user={user} />
        ))}
      </div>

      <div className="flex justify-between items-center p-4 border-t border-solid">
        <div className="text-sm text-gray-500">
          Hiển thị 5 trên tổng số 25 tài khoản
        </div>
        <Pagination />
      </div>
    </section>
  );
};

export default UserTable;
