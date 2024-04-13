import React from 'react'
import './LogoHeader.css'
import { Link } from 'react-router-dom'

export default function LogoHeader({ srcLogo, imgW, titleFz, subTitleFz }) {
    return (
        <header className='logo-header'>
            <Link to="/">
                <img src={srcLogo} className="logo-header-site" style={{ width: imgW }} alt="logo-sabzlearn" />
            </Link>
            <div className='logo-header__text-logo'>
                <h2 style={{ fontSize: titleFz }}>سبزلرن</h2>
                <h3 style={{ fontSize: subTitleFz }} >Sabzlearn.ir</h3>
            </div>
        </header>
    )
}
