import React from 'react'
import './Course.css'
import './media.css'

export default function Course({ courseImg, coursePathImg, courseTitle, courseTeacher, courseCountUsers, coursePrice, courseScore, courseDetails, courseSector, courseBadg }) {
    return (
        <div className="col-12 parent-course-box">
            <div className="course-box">

                <a href="/">
                    <img src={`${coursePathImg}Images/Courses/${courseImg}`} alt="course" className="course-box__img" />
                </a>

                <div className="course-box__main">
                    <span className='course-box__sector'>{courseSector}</span>
                    {courseBadg && <span className='course-box__sector badg-course'>{courseBadg}</span>}
                    <a href="/" className="course-box__title"> {courseTitle} </a>
                    <p className='course-box__details line-clamp-2'>
                        {courseDetails}
                    </p>

                    <div className="course-box__rating-teacher">

                        <div className="course-box__teacher">
                            <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <a href="/" className="course-box__teacher-link">
                                {courseTeacher}
                            </a>
                        </div>

                        <div className="course-box__rating">
                            <small className='course-box__rating-score'>{`${courseScore.toLocaleString()}.${(0).toLocaleString()}`}</small>
                            <img src="./Images/svgs/star_fill.svg" alt="star" className="course-box__star" />
                        </div>

                    </div>

                    <div className="course-box__status">
                        <div className="course-box__users">
                            <i className="fas fa-users course-box__users-icon"></i>
                            <span className="course-box__user-text">{courseCountUsers.toLocaleString()}</span>
                        </div>
                        <span className="course-box__price">{coursePrice.toLocaleString()} <small>تومان</small> </span>
                    </div>
                </div>

                <div className="course-box__footer">
                    <a href="/" className="course-box__footer-link">
                        <p>مشاهده اطلاعات</p>
                        <i className="fas fa-arrow-left course-box__footer-icon"></i>
                    </a>
                </div>

            </div>
        </div>
    )
}
