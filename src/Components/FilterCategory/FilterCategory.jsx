import React from 'react'

export default function FilterCategory() {
    return (
        <>
            <section className='category-list__parent'>
                <p className='category-list__title'>دسته بندی دوره ها</p>
                <ul className='category-list__ul'>
                    <li className='category-list'>

                        <div className='category-list__right'>
                            <input type="checkbox" className="form-check-input category-list__input" />
                            <p className='category-list__name'>فرانت اند</p>
                        </div>
                        <div className='category-list__left'>
                            <span className='category-list__count-course'>26</span>
                        </div>

                    </li>
                    <li className='category-list'>

                        <div className='category-list__right'>
                            <input type="checkbox" className="form-check-input category-list__input" />
                            <p className='category-list__name'>امنیت</p>
                        </div>
                        <div className='category-list__left'>
                            <span className='category-list__count-course'>26</span>
                        </div>

                    </li>
                    <li className='category-list'>

                        <div className='category-list__right'>
                            <input type="checkbox" className="form-check-input category-list__input" />
                            <p className='category-list__name'>پایتون</p>
                        </div>
                        <div className='category-list__left'>
                            <span className='category-list__count-course'>26</span>
                        </div>

                    </li>
                    <li className='category-list'>

                        <div className='category-list__right'>
                            <input type="checkbox" className="form-check-input category-list__input" />
                            <p className='category-list__name'>پی اچ پی</p>
                        </div>
                        <div className='category-list__left'>
                            <span className='category-list__count-course'>26</span>
                        </div>

                    </li>
                    <li className='category-list'>

                        <div className='category-list__right'>
                            <input type="checkbox" className="form-check-input category-list__input" />
                            <p className='category-list__name'>ارتقای مهارت ها</p>
                        </div>
                        <div className='category-list__left'>
                            <span className='category-list__count-course'>26</span>
                        </div>

                    </li>
                </ul>
            </section>

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
        </>
    )
}
