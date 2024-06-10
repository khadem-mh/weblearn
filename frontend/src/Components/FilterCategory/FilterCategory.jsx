import React, { useEffect, useState } from 'react'

export default function FilterCategory({ categorySwitch, titleCategory, category = null, onAddCategory, onRemoveCategory, onFilteredOverCourses }) {

    const [textActiveFilter, setTextActiveFilter] = useState('popular')

    useEffect(() => {
        onFilteredOverCourses && onFilteredOverCourses('popular')
    }, [])

    const getCategoryHandler = event => event.target.checked ? onAddCategory(event.target.dataset.category) : onRemoveCategory(event.target.dataset.category)

    const getFilterForCourses = event => {
        if (event.target.checked) {
            setTextActiveFilter(event.target.dataset.filter)
            onFilteredOverCourses(event.target.dataset.filter)
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
                            <input type="checkbox" className="form-check-input" data-filter={'popular'} checked={textActiveFilter === 'popular' ? true : false} onChange={e => getFilterForCourses(e)} />
                        </div>
                        <p className='category-switch__text'>محبوب ترین دوره ها</p>
                    </div>
                    
                    <div className='category-switch__div'>
                        <div className="form-check form-switch">
                            <input type="checkbox" className="form-check-input" data-filter={'free'} checked={textActiveFilter === 'free' ? true : false} onChange={e => getFilterForCourses(e)} />
                        </div>
                        <p className='category-switch__text'>فقط دوره های رایگان</p>
                    </div>


                </section>
            }

        </>
    )
}
