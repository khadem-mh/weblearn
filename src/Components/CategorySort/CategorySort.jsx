import React, { useState, useRef } from 'react'
import './CategorySort.css'
import { ImSortAmountDesc } from "react-icons/im";

export default function CategorySort() {

    const refListSort = useRef()
    const [selectedItem, setSelectedItem] = useState(0)

    const clickHandlerSelectItem = (e) => {
        if (e.target.dataset.value !== selectedItem) {
            const childrenListArray = Array.from(refListSort.current.children)
            childrenListArray.map(child => child.classList.contains('select-item-sort') && child.classList.remove('select-item-sort'))
        }
        e.target.classList.add('select-item-sort')
        setSelectedItem(e.target.dataset.value)
    }

    return (
        <section className='category-sort d-none d-sm-flex'>
            <div className='category-sort__right'>
                <ImSortAmountDesc className='category-sort__icon' />
                <span className='category-sort__title'>مرتب سازی :</span>
            </div>
            <div className='category-sort__left' ref={refListSort}>
                <p className='category-sort__item select-item-sort' data-value="0" onClick={(e) => clickHandlerSelectItem(e)}>همه دوره ها</p>
                <p className='category-sort__item' data-value="1" onClick={(e) => clickHandlerSelectItem(e)}>ارزان ترین</p>
                <p className='category-sort__item' data-value="2" onClick={(e) => clickHandlerSelectItem(e)}>گران ترین</p>
                <p className='category-sort__item' data-value="3" onClick={(e) => clickHandlerSelectItem(e)}>پرمخاطب ترین</p>
            </div>
        </section>
    )
}
