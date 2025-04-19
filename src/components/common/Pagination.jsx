import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Pagination({ totalPages = 10, basePath = "product/all", onPageChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract current page from URL
  const getCurrentPage = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const currentPage = parseInt(lastSegment, 10);
    return isNaN(currentPage) ? 1 : currentPage;
  };

  const currentPage = getCurrentPage();
  
  // Generate page links with query parameters
  const getPageUrl = (page) => {
    const params = new URLSearchParams(location.search);
    return `/${basePath}/${page}${params.toString() ? `?${params.toString()}` : ''}`;
  };
  
  // Define which page numbers to show
  const getVisiblePages = () => {
    let pages = [];
    
    // Always include page 1, 2, and 3
    if (totalPages <= 7) {
      // If we have 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first 3
      pages = [1, 2, 3];
      
      // Add ellipsis and last 3 pages if we're in the first 3 pages
      if (currentPage <= 3) {
        pages.push("ellipsis", totalPages - 2, totalPages - 1, totalPages);
      } 
      // Add ellipsis at start and end if we're in the middle
      else if (currentPage > 3 && currentPage < totalPages - 2) {
        pages = [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
      } 
      // Add first pages, ellipsis, and last 3 if we're in the last 3 pages
      else {
        pages = [1, 2, 3, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handleNavigate = (e, page) => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    } else {
      navigate(getPageUrl(page));
    }
  };

  return (
    <div
      role="navigation"
      aria-label="pagination"
      className="flex justify-center items-center my-5 w-full"
    >
      <ul className="flex flex-row gap-2 items-center p-0 m-0">
        {/* Previous button */}
        <li>
          <Link
            className={`flex gap-1 items-center px-3 py-2 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all ${
              currentPage <= 1 ? "text-zinc-300 cursor-not-allowed" : "text-zinc-500 cursor-pointer"
            } duration-200`}
            to={currentPage <= 1 ? "#" : getPageUrl(currentPage - 1)}
            aria-label="Go to previous page"
            onClick={(e) => {
              if (currentPage <= 1) {
                e.preventDefault();
              } else {
                handleNavigate(e, currentPage - 1);
              }
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Previous</span>
          </Link>
        </li>

        {/* Page numbers */}
        {visiblePages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`}>
                <span
                  aria-hidden="true"
                  className="flex justify-center items-center w-9 h-9 px-3 py-3 text-zinc-500"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                  <span className="overflow-hidden absolute p-0 -m-px w-px h-px whitespace-nowrap">
                    More pages
                  </span>
                </span>
              </li>
            );
          }
          
          const isActive = page === currentPage;
          
          return (
            <li key={page}>
              <Link
                className={`w-9 h-9 px-3 py-3 text-sm font-medium no-underline bg-transparent rounded-md border ${
                  isActive 
                    ? "text-black border-zinc-400" 
                    : "text-zinc-500 border-transparent"
                } border-solid transition-all cursor-pointer duration-200`}
                to={getPageUrl(page)}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleNavigate(e, page)}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {/* Next button */}
        <li>
          <Link
            className={`flex gap-1 items-center px-3 py-2 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all ${
              currentPage >= totalPages ? "text-zinc-300 cursor-not-allowed" : "text-zinc-500 cursor-pointer"
            } duration-200`}
            to={currentPage >= totalPages ? "#" : getPageUrl(currentPage + 1)}
            aria-label="Go to next page"
            onClick={(e) => {
              if (currentPage >= totalPages) {
                e.preventDefault();
              } else {
                handleNavigate(e, currentPage + 1);
              }
            }}
          >
            <span>Next</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;