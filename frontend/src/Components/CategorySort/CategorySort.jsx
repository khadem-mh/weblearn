import React, { useState, useRef } from 'react'
import './CategorySort.css'
import { ImSortAmountDesc } from "react-icons/im";

export default function CategorySort({ namesList }) {

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
                {
                    namesList.length > 1
                        ?
                        (
                            namesList.map((item, index) => (
                                <p className={`category-sort__item ${index === 0 ? "select-item-sort" : ''}`} data-value={index} onClick={(e) => clickHandlerSelectItem(e)}>{item}</p>
                            ))
                        )
                        :
                        <p className='category-sort__item select-item-sort' data-value="0" onClick={(e) => clickHandlerSelectItem(e)}>{namesList}</p>
                }
            </div>
        </section>
    )
}
