import React, { useState } from 'react';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Acer Swift X14', category: 'Laptops', price: '52.990.000đ', stock: 15 },
    { id: 2, name: 'Macbook Pro 14 M2', category: 'Laptops', price: '48.800.000đ', stock: 8 },
    { id: 3, name: 'MSI RTX 3060', category: 'Card đồ họa', price: '29.490.000đ', stock: 22 },
    { id: 4, name: 'ASUS Vivobook 5 14', category: 'Laptops', price: '22.990.000đ', stock: 30 },
    { id: 5, name: 'Samsung Galaxy S23', category: 'Điện thoại', price: '18.490.000đ', stock: 25 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { id: products.length + 1, ...newProduct }
    ]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: ''
    });
    setShowAddModal(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thêm sản phẩm mới
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tồn kho
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Sửa
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal thêm sản phẩm */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tên sản phẩm
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Danh mục
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="">Chọn danh mục</option>
                <option value="Laptops">Laptops</option>
                <option value="Điện thoại">Điện thoại</option>
                <option value="Card đồ họa">Card đồ họa</option>
                <option value="Phụ kiện">Phụ kiện</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Giá
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Số lượng tồn kho
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mô tả
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => setShowAddModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddProduct}
              >
                Thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;