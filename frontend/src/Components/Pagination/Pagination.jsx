import React, { useEffect, useState } from 'react'
import './Pagination.css'
import { useLocation } from 'react-router-dom'

export default function Pagination({ arrCourses, count }) {

    const location = useLocation()

    const [arrHelp, setArrHelp] = useState([])
    const [pageActive, setPageActive] = useState(+window.location.pathname.slice(18))

    useEffect(() => {
        console.log(arrCourses);
        console.log(count);

        let page = (arrCourses.length % count) === 0 ? (arrCourses.length / count) : (parseInt(arrCourses.length / count) + 1)

        let endIndex = page * count
        let startIndex = endIndex - count

        for (let i = 0; i < page; i++) setArrHelp(prev => [...prev, i])

        if (+window.location.pathname.slice(18) > page) {
            window.history.pushState({}, '', `/all-courses/page/1`)
            setPageActive(1)
        }
    }, [])

    const clickHandlerPagination = pageNum => {
        if (window.location.pathname.slice(18) != pageNum) {
            window.history.pushState({}, '', `/all-courses/page/${pageNum}`)
            setPageActive(pageNum)
        }
    }

    return (
        <div className="pagination">
            <ul className="pagination-list">

                {
                    arrHelp.length > 4
                        ?
                        <>
                            <li className="pagination-item">
                                <a href="/" className="pagination-link">
                                    <i className="fas fa-long-arrow-alt-right pagination-icon"></i>
                                </a>
                            </li>
                            {
                                arrHelp.map(item => (
                                    <li key={item} className='pagination-item' onClick={() => clickHandlerPagination(item + 1)}>
                                        <p className={`pagination-link ${(item + 1 === pageActive) ? 'page-num-active' : ''}`}>
                                            {item + 1}
                                        </p>
                                    </li>
                                ))

                            }
                            <li className="pagination-item">
                                <a href="/" className="pagination-link">
                                    <i className="fas fa-long-arrow-alt-left pagination-icon"></i>
                                </a>
                            </li>
                        </>
                        :
                        arrHelp.map(item => (
                            <li key={item} className='pagination-item' onClick={() => clickHandlerPagination(item + 1)}>
                                <p className={`pagination-link ${(item + 1 === pageActive) ? 'page-num-active' : ''}`}>
                                    {item + 1}
                                </p>
                            </li>
                        ))
                }



            </ul>
        </div>
    )
}
