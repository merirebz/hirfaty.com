import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  const handleClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageRange = range(1, totalPages);

    return (
        <div className="d-flex w-100 mb-4 justify-content-center">
      <ul className="pagination flex justify-center">
        {pageRange.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "bg-[#F1634C] m-2 w-[50px] flex justify-center items-center text-white text-center h-[50px] rounded-md active" : "bg-[#9da1a7] m-2 w-[50px] flex justify-center items-center text-white text-center h-[50px] rounded-md "} `}
            onClick={() => handleClick(page)}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
      </div>
    );
  };

  return <div>{renderPageNumbers()}</div>;
};

export default Pagination;
