import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row  d-flex justify-content-center align-items-center">
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center ">
            <nav style={{ cursor: "pointer" }}>
              <ul className="pagination">
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <button
                      onClick={() => paginate(number)}
                      className="page-link"
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
export default Pagination;
