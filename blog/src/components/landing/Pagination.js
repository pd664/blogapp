import React, { useState } from 'react'
import '../../static/landing/pagination.css'

function Pagination(props) {
    const { data, RenderComponent, title, dataLimit } = props 
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        return setCurrentPage((page) => {
            if(page == pages) return page = 1
            else return page+1
        })
    }

    function goToPreviousPage() {
        setCurrentPage((page) => {
            if(page > 1) return page-1
            else return page = 1
        })
    }
    function changePage(event) {
        let pageNumber = Number(event.target.textContext)
        return setCurrentPage(pageNumber)
    }

    const getPaginatedData = () => {
        const start = currentPage * dataLimit - dataLimit
        const end = start + dataLimit
        return data.slice(start, end)
    }
    const getPaginationGroup = () => {
        let pagelimit =  Math.ceil(5 / dataLimit)
        let start = Math.floor((currentPage - 1) / pagelimit) * pagelimit;
        return new Array(pagelimit).fill().map((_, idx) => start + idx + 1);
    }

    return (
        <div className="content">
        <h1 className="content">{title}</h1>
    
        <div className="dataContainer">
          {getPaginatedData().map((d, idx) => (
            <RenderComponent key={idx} data={d} />
          ))}
        </div>

        <div className="pagination mt-4">
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          >
            prev
          </button>
    
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? 'active' : null}`}
            >
              <span>{item}</span>
            </button>
          ))}
    
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
          >
            next
          </button>
        </div>
      </div>
    )
}

export default Pagination