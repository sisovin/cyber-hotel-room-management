import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Always show first page
    if (totalPages > 1) pageNumbers.push(1);

    // Ellipsis after first page
    if (currentPage > 3) {
      pageNumbers.push('...');
    }

    // Pages around current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }
    
    // Ellipsis before last page
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }

    // Always show last page
    pageNumbers.push(totalPages);
    
    // Remove duplicates that might occur for small totalPages
    return [...new Set(pageNumbers)];
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center space-x-4">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center space-x-2 px-4 py-2 bg-cyber-light rounded-lg border border-gray-600 hover:border-teal disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={16} />
        <span>Prev</span>
      </button>

      <div className="flex items-center space-x-2">
        {renderPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageClick(page)}
            disabled={typeof page !== 'number'}
            className={`px-4 py-2 rounded-lg border transition ${
              currentPage === page
                ? 'bg-neon text-black border-neon shadow-neon-sm'
                : 'bg-cyber-light border-gray-600 hover:border-neon'
            } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center space-x-2 px-4 py-2 bg-cyber-light rounded-lg border border-gray-600 hover:border-teal disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
