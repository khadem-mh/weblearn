import React from 'react'
import './StatusBox.css'
import './media.css'

export default function StatusBox({ title, subTitle, icon, classParentBox, classBox, fzTitle = '1.8rem', fzSubTitle = '1.2rem', bgColor = 'var(--blue-light-color)' }) {
    return (
        <div className={`parent-status-box ${classParentBox ? classParentBox : ''}`}>
            <div className={`course-boxes__box ${classBox}`} style={{ backgroundColor: bgColor }}>
                <div className="course-boxes__box-right">
                    {icon}
                </div>
                <div className={`course-boxes__box-left ${classBox}`}>
                    <span className="course-boxes__box-left-title" style={{ fontSize: fzTitle }}>
                        {title}
                    </span>
                    <span className="course-boxes__box-left--subtitle box-support" style={{ fontSize: fzSubTitle }}>
                        {subTitle}
                    </span>
                </div>
            </div>
        </div>
    )
}
