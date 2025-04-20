import React, { useState, useEffect } from 'react';

const AddressSelection = ({ onAddressSelect, onProceed }) => {
  // State cho danh sách địa chỉ
  const [addresses, setAddresses] = useState([]);
  // State cho địa chỉ đang được chọn
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  // State hiển thị form thêm địa chỉ mới
  const [showAddForm, setShowAddForm] = useState(false);
  // State cho thông tin địa chỉ mới
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: ''
  });

  // Load danh sách địa chỉ từ localStorage khi component được tạo
  useEffect(() => {
    const savedAddresses = localStorage.getItem('userAddresses');
    if (savedAddresses) {
      const parsedAddresses = JSON.parse(savedAddresses);
      setAddresses(parsedAddresses);
      
      // Nếu có địa chỉ, mặc định chọn địa chỉ đầu tiên
      if (parsedAddresses.length > 0) {
        setSelectedAddressId(parsedAddresses[0].id);
        onAddressSelect(parsedAddresses[0]);
      }
    }
  }, [onAddressSelect]);

  // Xử lý khi người dùng thay đổi thông tin địa chỉ mới
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    });
  };

  // Xử lý khi người dùng chọn địa chỉ
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
    }
  };

  // Xử lý khi người dùng thêm địa chỉ mới
  const handleAddAddress = () => {
    // Kiểm tra các trường bắt buộc
    if (!newAddress.firstName || !newAddress.lastName || !newAddress.streetAddress || 
        !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.mobile) {
      alert('Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }

    // Tạo địa chỉ mới với ID ngẫu nhiên
    const newAddr = {
      ...newAddress,
      id: Date.now().toString()
    };

    // Cập nhật danh sách địa chỉ
    const updatedAddresses = [...addresses, newAddr];
    setAddresses(updatedAddresses);
    
    // Lưu vào localStorage
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
    
    // Chọn địa chỉ mới thêm
    setSelectedAddressId(newAddr.id);
    onAddressSelect(newAddr);
    
    // Đóng form thêm địa chỉ mới
    setShowAddForm(false);
    
    // Reset form
    setNewAddress({
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      mobile: ''
    });
  };

  // Xử lý khi người dùng chọn giao hàng đến địa chỉ đã chọn
  const handleProceed = () => {
    if (!selectedAddressId) {
      alert('Vui lòng chọn địa chỉ giao hàng');
      return;
    }
    
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    onProceed(selectedAddress);
  };

  // Component hiển thị thông tin địa chỉ đã chọn
  const SelectedAddressCard = () => {
    const address = addresses.find(addr => addr.id === selectedAddressId);
    
    if (!address) return null;
    
    return (
      <div className="w-full bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="p-5 bg-white">
          <h2 className="text-xl font-bold mb-4">Address Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">First Name:</p>
              <p className="text-base">{address.firstName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Name:</p>
              <p className="text-base">{address.lastName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Street Address:</p>
              <p className="text-base">{address.streetAddress}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">City:</p>
              <p className="text-base">{address.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">State:</p>
              <p className="text-base">{address.state}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Zip Code:</p>
              <p className="text-base">{address.zipCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Mobile:</p>
              <p className="text-base">{address.mobile}</p>
            </div>
          </div>
        </div>
        <button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 transition-colors"
          onClick={handleProceed}
        >
          GIAO HÀNG ĐẾN ĐỊA CHỈ NÀY
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Cột bên trái: Thông tin địa chỉ đã chọn */}
      <div className="w-full md:w-1/2">
        {selectedAddressId && <SelectedAddressCard />}
        
        {/* Danh sách địa chỉ đã lưu */}
        {addresses.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Địa chỉ đã lưu</h2>
            <div className="space-y-3">
              {addresses.map(address => (
                <div 
                  key={address.id} 
                  className={`cursor-pointer p-4 border rounded-md transition-all 
                    ${selectedAddressId === address.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                    }`}
                  onClick={() => handleAddressSelect(address.id)}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id={`address-${address.id}`}
                      name="address"
                      checked={selectedAddressId === address.id}
                      onChange={() => handleAddressSelect(address.id)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium">{address.firstName} {address.lastName}</div>
                      <div className="text-sm text-gray-600">{address.streetAddress}</div>
                      <div className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</div>
                      <div className="text-sm text-gray-600">Điện thoại: {address.mobile}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Cột bên phải: Form thêm địa chỉ mới */}
      <div className="w-full md:w-1/2">
        {!showAddForm ? (
          <button 
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors mb-6"
            onClick={() => setShowAddForm(true)}
          >
            THÊM ĐỊA CHỈ MỚI
          </button>
        ) : (
          <div className="bg-white p-6 border border-gray-200 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4">Thêm địa chỉ mới</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ *</label>
                <input
                  type="text"
                  name="firstName"
                  value={newAddress.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên *</label>
                <input
                  type="text"
                  name="lastName"
                  value={newAddress.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ *</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={newAddress.streetAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố *</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố *</label>
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã bưu điện *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={newAddress.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                <input
                  type="text"
                  name="mobile"
                  value={newAddress.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 py-2 px-6 rounded hover:bg-gray-300 transition-colors"
                onClick={() => setShowAddForm(false)}
              >
                HỦY
              </button>
              <button
                type="button"
                className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700 transition-colors"
                onClick={handleAddAddress}
              >
                THÊM ĐỊA CHỈ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSelection;