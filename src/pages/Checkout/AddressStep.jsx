import React from "react";

const AddressStep = ({
  savedAddresses,
  selectedAddress,
  handleAddressSelect,
  shippingInfo,
  handleShippingChange,
  selectedProvinceId,
  selectedDistrictId,
  selectedWardId,
  handleProvinceChange,
  handleDistrictChange,
  handleWardChange,
  provinces,
  districts,
  wards,
  isLoadingProvinces,
  isLoadingDistricts,
  isLoadingWards,
  handlePrevStep,
  handleAddAddress,
  handleNextStep
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-6">Địa chỉ đã lưu</h2>
        <div className="max-h-80 overflow-y-auto pr-2 space-y-4">
          {savedAddresses.map(address => (
            <div
              key={address.id}
              className={`p-4 border ${selectedAddress && selectedAddress.id === address.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} rounded-md cursor-pointer hover:border-blue-400`}
              onClick={() => handleAddressSelect(address)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{address?.fullName}</h3>
                  <p className="text-gray-600 mt-1 text-sm">{address?.phoneNumber}</p>
                  <p className="text-gray-600 text-sm">{address?.street}</p>
                  <p className="text-gray-600 text-sm">{address?.ward}, {address?.district}, {address?.province}</p>
                </div>
                {address.isDefault && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Mặc định</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
            <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
            <input type="tel" id="phone" name="phone" value={shippingInfo.phone} onChange={handleShippingChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="email" name="email" value={shippingInfo.email} onChange={handleShippingChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố *</label>
              <select
                id="province"
                name="province"
                value={selectedProvinceId}
                onChange={handleProvinceChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                disabled={isLoadingProvinces}
                required
              >
                <option value="">{isLoadingProvinces ? 'Đang tải...' : 'Chọn Tỉnh/Thành phố'}</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.id}>{province.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện *</label>
              <select
                id="district"
                name="district"
                value={selectedDistrictId}
                onChange={handleDistrictChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                disabled={!selectedProvinceId || isLoadingDistricts}
                required
              >
                <option value="">{isLoadingDistricts ? 'Đang tải...' : 'Chọn Quận/Huyện'}</option>
                {districts.map(district => (
                  <option key={district.id} value={district.id}>{district.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã *</label>
            <select
              id="ward"
              name="ward"
              value={selectedWardId}
              onChange={handleWardChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
              disabled={!selectedDistrictId || isLoadingWards}
              required
            >
              <option value="">{isLoadingWards ? 'Đang tải...' : 'Chọn Phường/Xã'}</option>
              {wards.map(ward => (
                <option key={ward.id} value={ward.id}>{ward.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Số nhà, tên đường *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              placeholder="Ví dụ: 123 Nguyễn Huệ"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
            <textarea id="note" name="note" value={shippingInfo.note} onChange={handleShippingChange} rows="3" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
        </form>
      </div>

      <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
        <button
          className="py-4 px-8 text-base font-semibold text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          onClick={handlePrevStep}
        >
          QUAY LẠI GIỎ HÀNG
        </button>
        <div className="flex gap-4">
          <button
            className={`py-4 px-8 text-base font-semibold  rounded hover:bg-blue-50 transition-colors ${!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !selectedWardId || !selectedDistrictId || !selectedProvinceId ? 'opacity-50 cursor-not-allowed' : 'text-blue-600 border border-blue-600'}`}
            onClick={handleAddAddress}
          >
            THÊM ĐỊA CHỈ
          </button>
          <button
            className="py-4 px-8 text-base font-semibold text-white bg-rose-600 rounded hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNextStep}
            disabled={!selectedAddress}
          >
            TIẾP TỤC THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
