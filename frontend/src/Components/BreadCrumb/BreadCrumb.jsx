import React from 'react'
import { Link } from 'react-router-dom'
import './BreadCrumb.css'
import { HiOutlineHome } from "react-icons/hi2";

export default function BreadCrumb({ links }) {
    console.log(links);
    return (
        <div className="breadcrumb">
            <div className="breadcrumb__item">
                <Link to="/" className="breadcrumb__link">
                    <HiOutlineHome className='breadcrumb__link-home' />
                </Link>
            </div>
            {
                links &&
                links.map((link, index) => (
                    link.to ?
                        <div key={index} className="breadcrumb__item">
                            <Link to={`/${link.to && link.to}`} className="breadcrumb__link">{link.title}</Link>
                        </div>
                        :
                        <div key={index} className="breadcrumb__item">
                            <p className="breadcrumb__link text-light">{link.title}</p>
                        </div>
                ))
            }
        </div>
    )
}
