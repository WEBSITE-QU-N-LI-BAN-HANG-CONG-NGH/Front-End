import React from 'react';

const Dashboard = () => {
  // Thống kê giả định
  const stats = [
    { title: 'Tổng sản phẩm', value: '124', icon: 'ti ti-box', color: 'bg-blue-500' },
    { title: 'Tổng đơn hàng', value: '56', icon: 'ti ti-shopping-cart', color: 'bg-green-500' },
    { title: 'Tổng người dùng', value: '210', icon: 'ti ti-users', color: 'bg-purple-500' },
    { title: 'Doanh thu tháng', value: '45.8tr VNĐ', icon: 'ti ti-report-money', color: 'bg-yellow-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Trang tổng quan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} text-white p-3 rounded-full mr-4`}>
                <i className={`${stat.icon} text-xl`}></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Đơn hàng gần đây</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #ORD{Math.floor(Math.random() * 10000)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Khách hàng {item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Hoàn thành
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Sản phẩm bán chạy</h2>
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="py-4 flex">
                <img src="/Placeholder2.png" alt="" className="h-16 w-16 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">Laptop Acer Swift {item}</p>
                  <p className="text-sm text-gray-500">Đã bán: {Math.floor(Math.random() * 100)} chiếc</p>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  {(Math.random() * 50).toFixed(2)}tr VNĐ
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;