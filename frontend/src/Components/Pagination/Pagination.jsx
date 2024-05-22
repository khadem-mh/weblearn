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

    useEffect(() => {

    }, [pageActive])

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
                            <li className={`pagination-item ${pageActive === 1 ? 'pagination-item-disable' : ''}`} onClick={() => pageActive !== 1 && clickHandlerPagination(pageActive - 1)}>
                                <p className={`pagination-link ${pageActive === 1 ? 'pagination-link-disable' : ''}`}>
                                    <i className="fas fa-long-arrow-alt-right pagination-icon"></i>
                                </p>
                            </li>
                            {
                                arrHelp.slice(pageActive - 2 === -1 ? pageActive - 1 : (arrHelp.length - 3) < pageActive ? arrHelp.length - 4 : pageActive - 2, arrHelp.length).map(item => (
                                    (item < pageActive + 1 && pageActive - 2 !== -1)
                                        ?
                                        <li key={item} className='pagination-item' onClick={() => clickHandlerPagination(item + 1)}>
                                            <p className={`pagination-link ${(item + 1 === pageActive) ? 'page-num-active' : ''}`}>
                                                {item + 1}
                                            </p>
                                        </li>
                                        :
                                        pageActive - 2 === -1 && item < pageActive + 2
                                            ?
                                            <li key={item} className='pagination-item' onClick={() => clickHandlerPagination(item + 1)}>
                                                <p className={`pagination-link ${(item + 1 === pageActive) ? 'page-num-active' : ''}`}>
                                                    {item + 1}
                                                </p>
                                            </li>
                                            :
                                            item + 1 === arrHelp.length - 1
                                                ?
                                                <li key={item + 1} className='pagination-item'>
                                                    <p className='pagination-link-dotted'>...</p>
                                                </li>
                                                :
                                                item + 1 === arrHelp.length
                                                &&
                                                <li key={item + 1} className='pagination-item' onClick={() => clickHandlerPagination(item + 1)}>
                                                    <p className={`pagination-link ${(item + 1 === pageActive) ? 'page-num-active' : ''}`}>
                                                        {item + 1}
                                                    </p>
                                                </li>
                                ))

                            }
                            <li className={`pagination-item ${pageActive === arrHelp.length ? 'pagination-item-disable' : ''}`} onClick={() => pageActive !== arrHelp.length && clickHandlerPagination(pageActive + 1)}>
                                <p className={`pagination-link ${pageActive === arrHelp.length ? 'pagination-link-disable' : ''}`}>
                                    <i className="fas fa-long-arrow-alt-left pagination-icon"></i>
                                </p>
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
