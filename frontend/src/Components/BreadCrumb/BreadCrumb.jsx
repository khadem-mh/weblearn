import React from 'react'
import { Link } from 'react-router-dom'
import './BreadCrumb.css'
import { HiOutlineHome } from "react-icons/hi2";

export default function BreadCrumb({ links }) {
    return (
        <div className="breadcrumb">
            <div className="breadcrumb__item">
                <Link to="/" className="breadcrumb__link">
                    <HiOutlineHome className='breadcrumb__link-home' />
                </Link>
            </div>
            {
                links && links.map((link, index) => (
                    <div key={index} className="breadcrumb__item">
                        <Link to={`/${link.to && link.to}`} className="breadcrumb__link">{link.title}</Link>
                    </div>
                ))
            }
        </div>
    )
}
