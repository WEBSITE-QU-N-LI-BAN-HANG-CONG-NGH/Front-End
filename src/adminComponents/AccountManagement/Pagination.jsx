// src/adminComponents/AccountManagement/Pagination.jsx
"use client";
import React from "react";

const PaginationButton = ({ children, onClick, active }) => (
  <button 
    className={`px-3 py-2 rounded-md cursor-pointer ${active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const buttons = [];
    
    // Always show first page
    buttons.push(
      <PaginationButton 
        key="first" 
        active={currentPage === 0}
        onClick={() => onPageChange(0)}
      >
        1
      </PaginationButton>
    );
    
    // Show ellipsis if needed
    if (currentPage > 2) {
      buttons.push(<span key="ellipsis1">...</span>);
    }
    
    // Show current page and adjacent pages
    for (let i = Math.max(1, currentPage); i <= Math.min(currentPage + 1, totalPages - 2); i++) {
      buttons.push(
        <PaginationButton 
          key={i} 
          active={currentPage === i}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </PaginationButton>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 3) {
      buttons.push(<span key="ellipsis2">...</span>);
    }
    
    // Always show last page
    if (totalPages > 1) {
      buttons.push(
        <PaginationButton 
          key="last" 
          active={currentPage === totalPages - 1}
          onClick={() => onPageChange(totalPages - 1)}
        >
          {totalPages}
        </PaginationButton>
      );
    }
    
    return buttons;
  };

  return (
    <div className="flex gap-2">
      <PaginationButton 
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
      >
        Trước
      </PaginationButton>
      
      {renderPageButtons()}
      
      <PaginationButton 
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
      >
        Sau
      </PaginationButton>
    </div>
  );
};

export default Pagination;