import React from 'react'
import Pagination from "react-bootstrap/Pagination"

const Paginations = ({ page, setPage, totalpage }) => {
  const handleNext = () => {
    setPage(page === totalpage ? page : page + 1)
  }
  const handlePrev = () => {
    setPage(page === 1 ? page : page - 1)
  }
  return (
    <div>
      <Pagination>
        <Pagination.Prev onClick={handlePrev}></Pagination.Prev>
        {
          [...Array(totalpage)].map((_, ind) => (
            <Pagination.Item active={page == ind + 1 ? true : false} onClick={() => setPage(ind + 1)} key={ind}>{ind + 1}</Pagination.Item>
          ))
        }
        <Pagination.Next onClick={handleNext}></Pagination.Next>
      </Pagination>

    </div>
  )
}

export default Paginations