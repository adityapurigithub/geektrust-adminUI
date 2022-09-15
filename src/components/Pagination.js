import React from "react";

const Pagination = ({
  totalData,
  rowPerPage,
  handlePrevClick,
  handleNextClick,
  currPage,
  paginate,
}) => {
  const pageNo = [];
  for (let i = 1; i <= Math.ceil(totalData / rowPerPage); i++) {
    pageNo.push(i);
  }
  return (
    <div className="paginate-layout-wrapper">
      <ul>
        {currPage > 1 ? (
          <img
            height="20"
            src="https://cdn-icons-png.flaticon.com/512/181/181657.png"
            alt="prev-icon"
            onClick={() => handlePrevClick(currPage)}
          />
        ) : (
          <img
            height="20"
            src="https://cdn-icons-png.flaticon.com/512/570/570220.png"
            alt="prev-icon"
            style={{ cursor: "not-allowed", color: "aliceblue" }}
          />
        )}

        {pageNo.map((num) => (
          <li>
            <button onClick={() => paginate(num)}>{num}</button>
          </li>
        ))}
        {currPage === Math.ceil(totalData / rowPerPage) ? (
          <img
            height="20"
            src="https://cdn-icons-png.flaticon.com/512/1549/1549454.png"
            alt="prev-icon"
            style={{ cursor: "not-allowed" }}
          />
        ) : (
          <img
            height="20"
            src="https://cdn-icons-png.flaticon.com/512/318/318476.png"
            alt="prev-icon"
            onClick={() => handleNextClick(currPage)}
          />
        )}
      </ul>
    </div>
  );
};

export default Pagination;
