import React from 'react'
import './HeaderList.css'
import { NavLink } from 'react-router-dom'
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function HeaderList({ title, urlDest, textLink, linkActive = true }) {
    return (
        <div className='content-left__top-header'>
            <p>{title}</p>

            <div>
                {
                    linkActive &&
                    <NavLink to={urlDest}>
                        <span>{textLink}</span>
                        <HiOutlineArrowLeft />
                    </NavLink>
                }
            </div>
        </div>
    )
}
