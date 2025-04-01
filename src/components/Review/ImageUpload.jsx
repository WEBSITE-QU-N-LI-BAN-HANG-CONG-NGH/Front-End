import React from "react";

const ImageUpload = ({ onUpload }) => {
  return (
    <div className="mb-5">
      <button
        onClick={onUpload}
        className="inline-flex gap-2.5 items-center px-5 py-2.5 rounded border border-solid cursor-pointer border-zinc-300 hover:bg-gray-50"
        type="button"
      >
        <i className="ti ti-upload" aria-hidden="true" />
        <span>Gửi Ảnh</span>
      </button>
    </div>
  );
};

export default ImageUpload;
