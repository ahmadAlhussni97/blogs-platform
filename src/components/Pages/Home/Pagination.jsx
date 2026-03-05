import { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { constData } from "../../../Helpers/ConstData";

export default memo(function Pagination(props) {
  const { start, limit, length, changePage } = props;

  const [currentPage, setCurrentPage] = useState(
    start > 0 ? parseInt(start / 10) : 0
  );
  const recordsPerPage = limit;
  const nPages = Math.ceil(length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const reInitialize = () => {
    if (Number(start) <= 0) setCurrentPage(constData().defultStart);
  };

  const generateNewPage = (pgNumber) => {
    setCurrentPage(pgNumber);
  };

  const goToNextPage = () => {
    if (currentPage !== nPages - 1) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };

  // Call changePage whenever currentPage changes
  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  // Re-initialize whenever start changes
  useEffect(() => {
    reInitialize();
  }, [start]);

  return (
    <div className="pagination">
      <Link onClick={goToPrevPage} to="/">
        «
      </Link>
      {pageNumbers.map((pgNumber) => (
        <Link
          key={pgNumber - 1}
          className={`page-item ${
            currentPage === pgNumber - 1 ? "active-link" : ""
          } `}
          onClick={() => generateNewPage(pgNumber - 1)}
          to="/"
        >
          {pgNumber}
        </Link>
      ))}
      <Link onClick={goToNextPage} to="/">
        »
      </Link>
    </div>
  );
});