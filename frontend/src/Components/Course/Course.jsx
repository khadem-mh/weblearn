import React, { useState } from 'react'
import './Course.css'
import './media.css'
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

export default function Course({ discount, shortName, cover, categoryID, description, creator, courseAverageScore, registers, name, price, courseBadg }) {

    const [imageLoaded, setImageLoaded] = useState(false)
    const onImageLoaded = () => setImageLoaded(true)

    return (
        <div className={`col-12 parent-course-box`}>
            {
                price !== 0 ?
                    <span className={discount > 0 ? 'discount-box' : ''}>{discount}%</span>
                    :
                    <span className={discount > 0 ? 'discount-box' : ''}>100%</span>
            }

            <div className="course-box">

                <Link to={`/course-info/${shortName}`}>
                    <img
                        src={`/Images/Courses/${cover}`}
                        alt="course"
                        className="course-box__img"
                        onLoad={onImageLoaded}
                    />
                    {
                        !imageLoaded &&
                        <div className='parent-spinner'>
                            <Spinner animation="grow" variant="success" />
                        </div>
                    }
                </Link>

                <div className="course-box__main">
                    {
                        categoryID &&
                        <span className='course-box__sector'>{categoryID?.name}</span>
                    }
                    {courseBadg && <span className='course-box__sector badg-course'>{courseBadg}</span>}
                    <a href="/" className="course-box__title"> {name} </a>
                    <p className='course-box__details line-clamp-2'>
                        {description}
                    </p>

                    <div className="course-box__rating-teacher">

                        <div className="course-box__teacher">
                            <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <Link to="/" className="course-box__teacher-link">
                                {creator}
                            </Link>
                        </div>

                        <div className="course-box__rating">
                            <small className='course-box__rating-score'>{`0.${courseAverageScore}`}</small>
                            <img src="/Images/svgs/star_fill.svg" alt="star" className="course-box__star" />
                        </div>

                    </div>

                    <div className="course-box__status">
                        <div className="course-box__users">
                            <i className="fas fa-users course-box__users-icon"></i>
                            <span className="course-box__user-text">{registers}</span>
                        </div>
                        {
                            !price 
                            ?
                                <div className='text-start'>
                                    <span>رایگان</span>
                                    <p className='course-info__footer-left_toman text-start'>برو حال کن</p>
                                </div>
                                : discount > 0
                                    ?
                                    <div className='d-flex flex-row-reverse'>
                                        <div>
                                            <span> <strike className='text-secondary'>{price.toLocaleString()}</strike> </span>
                                            <p className='course-info__footer-left_toman text-start'>{price === 0 ? '' : 'تومان'}</p>
                                        </div>
                                        <span className='mx-3'> {(price - (price * discount) / 100).toLocaleString()}</span>
                                    </div>
                                    :
                                    price.toLocaleString()
                        }
                    </div>
                </div>

                <div className="course-box__footer">
                    <Link to={`/course-info/${shortName}`} className="course-box__footer-link">
                        <p>مشاهده اطلاعات</p>
                        <i className="fas fa-arrow-left course-box__footer-icon"></i>
                    </Link>
                </div>

            </div>
        </div>
    )
}
