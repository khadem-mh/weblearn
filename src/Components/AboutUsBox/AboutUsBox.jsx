import React from 'react'
import './AboutUsBox.css'

export default function AboutUsBox({ titleBox, subTitleBox, iconBox }) {
    return (
        <div className="col-12">
            <div className="about-us__box">
                <div className="about-us__box-right">
                    {iconBox}
                </div>
                <div className="about-us__box-left">
                    <span className="about-us__box-title">{titleBox}</span>
                    <span className="about-us__box-text">{subTitleBox}</span>
                </div>
            </div>
        </div>
    )
}
