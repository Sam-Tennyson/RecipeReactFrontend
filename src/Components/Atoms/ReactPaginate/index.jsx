import React from 'react'
import ReactPaginate from 'react-paginate'
import "./style.scss"

const ReactPagination = ({
  rowsPerPage,
  activePage,
  totalCount,
  onPageChange=()=>{},
}) => {
  return (
    <>
        <ReactPaginate
            previousLabel="< previous"
            breakLabel="..."
            nextLabel="next >"
            pageCount={Math.ceil(totalCount/rowsPerPage)}
            onPageChange={onPageChange}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            forcePage={activePage-1}
            className="d-flex justify-content-center mt-4 pagination"
      />
    </>
  )
}

export default ReactPagination