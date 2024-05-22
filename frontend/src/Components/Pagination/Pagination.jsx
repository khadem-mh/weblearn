import React, { useEffect, useState } from 'react'
import './Pagination.css'
import { useLocation } from 'react-router-dom'

export default function Pagination({ arrCourses, count }) {

    const location = useLocation()

    const [arrHelp, setArrHelp] = useState([])

    useEffect(() => {
        console.log(arrCourses);
        console.log(count);
        let page = (arrCourses.length / count) % 0 ? (arrCourses.length / count) : (parseInt(arrCourses.length / count) + 1)
        let endIndex = page * count
        let startIndex = endIndex - count
        for (let i = 0; i < page; i++) setArrHelp(prev => [...prev, i])
    }, [])

    const clickHandlerPagination = pageNum => {
        if (window.location.pathname.slice(18) != pageNum) window.history.pushState({}, '', `/all-courses/page/${pageNum}`)

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
                                    <li key={item} className="pagination-item">
                                        <a href="/" className="pagination-link">
                                            {item + 1}
                                        </a>
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
                            <li key={item} className="pagination-item" onClick={() => clickHandlerPagination(item + 1)}>
                                <p className="pagination-link">
                                    {item + 1}
                                </p>
                            </li>
                        ))
                }



            </ul>
        </div>
    )
}
