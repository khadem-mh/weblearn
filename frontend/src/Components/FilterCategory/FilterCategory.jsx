import React, { useEffect, useState } from 'react'

export default function FilterCategory({ categorySwitch, titleCategory, category = null, onAddCategory, onRemoveCategory }) {

    const getCategoryHandler = event => {
        console.log(event);
        if (event.target.checked) {
            onAddCategory(event.target.dataset.category)
        } else {
            onRemoveCategory(event.target.dataset.category)
        }
    }

    return (
        <>
            {
                category &&
                <section className='category-list__parent'>
                    <p className='category-list__title'>{titleCategory}</p>
                    <ul className='category-list__ul'>
                        {
                            category.map((item, index) => (
                                <li key={index} className='category-list'>

                                    <div className='category-list__right'>
                                        <input type="checkbox" className="form-check-input category-list__input" data-category={item.href} onChange={e => getCategoryHandler(e)} />
                                        <p className='category-list__name'>{item.title}</p>
                                    </div>
                                    <div className='category-list__left'>
                                        <span className='category-list__count-course'>{item.submenus.length}</span>
                                    </div>

                                </li>
                            ))
                        }
                    </ul>
                </section>
            }
            {
                categorySwitch &&
                <section className='category-switch'>

                    <div className='category-switch__div'>
                        <div className="form-check form-switch">
                            <input type="checkbox" className="form-check-input" />
                        </div>
                        <p className='category-switch__text'>فقط دوره های رایگان</p>
                    </div>

                    <div className='category-switch__div'>
                        <div className="form-check form-switch">
                            <input type="checkbox" className="form-check-input" />
                        </div>
                        <p className='category-switch__text'>در حال پیش فروش</p>
                    </div>

                    <div className='category-switch__div'>
                        <div className="form-check form-switch">
                            <input type="checkbox" className="form-check-input" />
                        </div>
                        <p className='category-switch__text'>محبوب ترین دوره ها</p>
                    </div>

                </section>
            }

        </>
    )
}
