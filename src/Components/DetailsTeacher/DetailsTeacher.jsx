import React from 'react'
import './DetailsTeacher.css'
import { Link } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function DetailsTeacher({nameTeacher, textBio, imgTeacher, to}) {
    return (
        <div className='parent-info-teacher'>

            <div className="techer-details__header">

                <div className="techer-details__header-right">
                    <img src={imgTeacher} alt="Teacher Profile" className="techer-details__header-img" />
                    <Link to={`${to}`} className="techer-details__header-link">{nameTeacher}</Link>
                </div>

                <div className="techer-details__header-left">
                    <span className="techer-details__header-name">مدرس دوره</span>
                    <FaArrowRightFromBracket className='techer-details__header-icon' />
                </div>

            </div>

            <p className="techer-details__footer">
                {textBio}
            </p>

        </div>
    )
}
