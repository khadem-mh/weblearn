import React from 'react'
import './CategoryBox.css'

export default function CategoryBox({title, children, yourStyle}) {
    return (
        <div className={`parent-box-list ${yourStyle}`}>
            <span className="box-list-title">{title}</span>
            <ul className="box-list-ul">
                {children}
            </ul>
        </div>
    )
}
