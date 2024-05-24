import React, { useEffect, useState } from 'react'
import './Pagination.css'
import PaginationLi from './PaginationLi'
export default function Pagination({ arrDatas, countDataPerPage, onFilterDatas, pathName, isArrowsShow = true, separateBox = false, color = 'lightgray', bgColor = "#323242", colorActive = 'white', bgColorActive = "gray" }) {
    const pathLocation = window.location.pathname
    const [pageActive, setPageActive] = useState(+pathLocation.slice(+pathLocation.lastIndexOf('/') + 1))
    const [arrHelp, setArrHelp] = useState([])
    useEffect(() => {
        //? Handle Errors 
        if (typeof color !== 'string' || typeof bgColor !== 'string' || typeof colorActive !== 'string' || typeof bgColorActive !== 'string') throw new TypeError('typeof color and bgColor not String')
        if (typeof isArrowsShow !== 'boolean') throw new TypeError('typeof isArrowsShow not Boolean')
        if (typeof countDataPerPage !== 'number') throw new TypeError('typeof countDataPerPage not Number')
        if (arrDatas.constructor !== Array) throw new TypeError('typeof arrDatas not Array')
        if (typeof pathName !== 'string') throw new TypeError('typeof pathName not string')
        if (countDataPerPage <= 0) throw new TypeError('The lowest number must be at least 1')
        if (pathName.trim()[pathName.trim().length - 1] !== '/') throw new TypeError('The URL last should be /')
        if (pathName.trim()[0] !== '/') throw new TypeError('The URL first should be /')
        //? Find Count Page
        let page = (arrDatas.length % countDataPerPage) === 0 ? (arrDatas.length / countDataPerPage) : (parseInt(arrDatas.length / countDataPerPage) + 1)
        //? Creat Array Help
        if (arrHelp.length < 1) for (let i = 0; i < page; i++) setArrHelp(prev => [...prev, i])
        //? Redirect Count Mistake To Url Correct 
        if (
            +pathLocation.slice(+pathLocation.lastIndexOf('/') + 1) > page ||
            +pathLocation.slice(+pathLocation.lastIndexOf('/') + 1) <= 0 ||
            isNaN(+pathLocation.slice(+pathLocation.lastIndexOf('/') + 1))
        ) {
            window.history.pushState({}, '', `${pathName.trim()}1`)
            setPageActive(1)
        }
    }, [pathLocation, arrDatas, arrHelp, bgColor, bgColorActive, color, colorActive, countDataPerPage, isArrowsShow, pathName])
    useEffect(() => {
        let endIndex = pageActive * countDataPerPage
        let startIndex = endIndex - countDataPerPage
        onFilterDatas(arrDatas.slice(startIndex, endIndex))
    }, [pageActive, arrDatas, countDataPerPage, onFilterDatas])
    const clickHandlerPagination = pageNum => {
        if (+pathLocation.slice(+pathLocation.lastIndexOf('/') + 1) !== pageNum) {
            window.history.pushState({}, '', `${pathName.trim()}${pageNum}`)
            setPageActive(pageNum)
        }
    }
    return (
        <section className="pagination-container">
            <ul className="pagination-list">
                {
                    arrHelp.length > 4
                        ?
                        <>
                            {
                                isArrowsShow &&
                                <li className={`pagination-item ${pageActive === 1 ? 'pagination-link-disable ' : ''}`} style={{ color: color, backgroundColor: bgColor }} onClick={() => pageActive !== 1 && clickHandlerPagination(pageActive - 1)}>
                                    <p className={`${pageActive === 1 ? 'pagination-link-disable' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-short pagination-icon" viewBox="0 0 16 16">
                                            <path
                                                fillRule="evenodd"
                                                d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8"
                                            ></path>
                                        </svg>
                                    </p>
                                </li>
                            }
                            {
                                arrHelp.map(item => (
                                    pageActive === 1 && item + 1 <= pageActive + 2 ?
                                        <PaginationLi bgColor={bgColor} bgColorActive={bgColorActive} color={color} colorActive={colorActive} item={item} pageActive={pageActive} clickHandlerPagination={clickHandlerPagination} />
                                        :
                                        pageActive === 2 && item + 1 <= pageActive + 1 ?
                                            <PaginationLi bgColor={bgColor} bgColorActive={bgColorActive} color={color} colorActive={colorActive} item={item} pageActive={pageActive} clickHandlerPagination={clickHandlerPagination} />
                                            : (pageActive >= 3 && item + 1 === pageActive + 1) || (item + 1 === pageActive || item + 1 === pageActive - 1) ?
                                                <PaginationLi bgColor={bgColor} bgColorActive={bgColorActive} color={color} colorActive={colorActive} item={item} pageActive={pageActive} clickHandlerPagination={clickHandlerPagination} />
                                                : pageActive >= 4 && item + 1 === 1 ?
                                                    separateBox ?
                                                        <>
                                                            <PaginationLi bgColor={bgColor} bgColorActive={bgColorActive} color={color} colorActive={colorActive} item={item} pageActive={pageActive} clickHandlerPagination={clickHandlerPagination} />
                                                            <li key={item} className='pagination-item dotted-pagin' style={{ color: color, backgroundColor: bgColor }} ><p>...</p></li>
                                                        </> : !separateBox &&
                                                        <li key={item} className={`pagination-item ${pageActive === item + 1 ? 'pagination-item-disable' : ''}`} style={{ color: pageActive === item + 1 ? colorActive : color, backgroundColor: pageActive === item + 1 ? bgColorActive : bgColor }} onClick={() => clickHandlerPagination(item + 1)}>
                                                            <p>{item + 1} ...</p>
                                                        </li>
                                                    : (pageActive >= 4 && item + 1 !== 1 && item + 1 === pageActive + 1) || (item + 1 === pageActive || item + 1 === pageActive - 1) ?
                                                        <PaginationLi bgColor={bgColor} bgColorActive={bgColorActive} color={color} colorActive={colorActive} item={item} pageActive={pageActive} clickHandlerPagination={clickHandlerPagination} />
                                                        : arrHelp.length - 1 === item && arrHelp.length - 2 !== pageActive ?
                                                            separateBox ?
                                                                <>
                                                                    <li key={item} className='pagination-item dotted-pagin' style={{ color: color, backgroundColor: bgColor }} > <p>...</p></li>
                                                                    <PaginationLi bgColor={bgColor} bgColorActive={bgColorActive} color={color} colorActive={colorActive} item={item} pageActive={pageActive} clickHandlerPagination={clickHandlerPagination} />
                                                                </> : !separateBox &&
                                                                <li key={item} className={`pagination-item ${pageActive === item + 1 ? 'pagination-item-disable' : ''}`} style={{ color: pageActive === item + 1 ? colorActive : color, backgroundColor: pageActive === item + 1 ? bgColorActive : bgColor }} onClick={() => clickHandlerPagination(item + 1)}>
                                                                    <p>... {item + 1}</p>
                                                                </li>
                                                            : pageActive - 1 === arrHelp.length - 2 && item > arrHelp.length - 2 ?
                                                                <PaginationLi bgColor={bgColor} bgColorActive={bgColorActive} color={color} colorActive={colorActive} item={item} pageActive={pageActive} clickHandlerPagination={clickHandlerPagination} />
                                                                : arrHelp.length === pageActive && item + 1 >= arrHelp.length - 2 ?
                                                                    <PaginationLi bgColor={bgColor} bgColorActive={bgColorActive} color={color} colorActive={colorActive} item={item} pageActive={pageActive} clickHandlerPagination={clickHandlerPagination} /> : ''
                                ))
                            }
                            {
                                isArrowsShow &&
                                <li className={`pagination-item ${pageActive === arrHelp.length ? 'pagination-link-disable ' : ''}`} style={{ color: color, backgroundColor: bgColor }} onClick={() => pageActive !== arrHelp.length && clickHandlerPagination(pageActive + 1)}>
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-short pagination-icon" viewBox="0 0 16 16">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5"
                                            ></path>
                                        </svg>
                                    </p>
                                </li>
                            }
                        </>
                        :
                        arrHelp.map(item => (
                            <li key={item} className={`pagination-item ${pageActive === item + 1 ? 'pagination-item-disable' : ''}`} style={{ color: pageActive === item + 1 ? colorActive : color, backgroundColor: pageActive === item + 1 ? bgColorActive : bgColor }} onClick={() => clickHandlerPagination(item + 1)}>
                                <p>{item + 1}</p>
                            </li>
                        ))
                }
            </ul>
        </section>
    )
}