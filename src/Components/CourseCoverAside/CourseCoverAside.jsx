import React from 'react'
import './CourseCoverAside.css'
import { Link } from 'react-router-dom'

export default function CourseCoverAside({ link, title, teacher, pathImg, fzTitle }) {
    return (
        <li className="course-info__courses-list-item">
            <Link to={`/${link}`} className="course-info__courses-link">
                <img src={`Images/${pathImg}`} alt="Course Cover" className="course-info__courses-img" />
                <div className='course-info__courses-parent'>
                    <p className="course-info__courses-text line-clamp-2" style={{ fontSize: fzTitle }}>
                        {title}
                    </p>
                    <p className="course-info__courses-teacher line-clamp-2">
                        {teacher}
                    </p>
                </div>
            </Link>
        </li>
    )
}
