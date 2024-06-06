import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function FilterCategory({ categorySwitch, titleCategory, category = null }) {

    const categoryList = useParams()

    useEffect(() => {
        console.log('ok');
    }, [window.location.pathname])

    return (
        <>
            {
                category &&
                <section className='category-list__parent'>
                    <p className='category-list__title'>{titleCategory}</p>
                    <ul className='category-list__ul'>
                        {
                            category.map((item, index) => (
                                <li key={index} className='category-list' data-category={item.href}>

                                    <div className='category-list__right'>
                                        <input type="checkbox" className="form-check-input category-list__input" defaultChecked={item.href === categoryList.category && true} />
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
