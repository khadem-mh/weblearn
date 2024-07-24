import React, { useState, useRef, useEffect } from 'react'
import './CategorySort.css'
import { ImSortAmountDesc } from "react-icons/im";

export default function CategorySort({ namesList, onSelectedItem, selectItem }) {

    const refListSort = useRef()
    const [selectedItem, setSelectedItem] = useState(selectItem)
    const [currentChildActive, setCurrentChildActive] = useState(selectItem)

    useEffect(() => setCurrentChildActive(refListSort.current.children[0]), [])

    useEffect(() => {
        setSelectedItem(selectItem)
    }, [selectItem])

    useEffect(() => { selectedItem > 3 && currentChildActive.classList.remove('select-item-sort') }, [selectedItem])

    const clickHandlerSelectItem = (e) => {
        if (e.target.dataset.value !== selectedItem) {
            onSelectedItem(e.target.dataset.name)
            const childrenListArray = Array.from(refListSort.current.children)
            childrenListArray.map(child => child.classList.contains('select-item-sort') && child.classList.remove('select-item-sort'))
        }
        e.target.classList.add('select-item-sort')
        setCurrentChildActive(e.target)
        setSelectedItem(e.target.dataset.value)
    }

    return (
        <section className='category-sort'>
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
                                <p key={index} className={`category-sort__item ${index === 0 ? "select-item-sort" : ''}`} data-value={index} data-name={
                                    index === 0
                                        ? 'all'
                                        :
                                        index === 1
                                            ? 'cheap'
                                            : index === 2
                                                ? 'expensive'
                                                : index === 3 && 'personMore'
                                } onClick={(e) => clickHandlerSelectItem(e)}>{item}</p>
                            ))
                        )
                        :
                        <p className='category-sort__item select-item-sort' data-value="0" data-name={'all'} onClick={(e) => clickHandlerSelectItem(e)}>{namesList}</p>
                }
            </div>
        </section>
    )
}
