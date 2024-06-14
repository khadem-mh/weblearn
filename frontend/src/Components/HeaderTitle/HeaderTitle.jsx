import React from 'react'
import './HeaderTitle.css'
import { Link } from 'react-router-dom'

export default function HeaderTitle({ title, subTitle, textBtn, routeUrl = '' }) {
    return (
        <div className="courses-header text-center">
            <div className="courses-header__right">
                <span className="title">{title}</span>
                <span className="courses-header__text">{subTitle}</span>
            </div>
            {
                textBtn &&
                <div className="courses-header__left">
                    {
                        routeUrl !== ''
                            ?
                            <Link to={routeUrl} className="courses-header__link button">
                                {textBtn}
                                <i className="fas fa-arrow-left courses-header__icon"></i>
                            </Link>
                            :
                            <p className="courses-header__link button">
                                {textBtn}
                            </p>
                    }

                </div>
            }
        </div>
    )
}
