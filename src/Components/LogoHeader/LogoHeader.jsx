import React from 'react'
import './LogoHeader.css'
import { Link } from 'react-router-dom'

export default function LogoHeader({srcLogo}) {
    return (
        <header className='logo-header'>
            <Link to="/">
                <img src={srcLogo} className="logo-header-site" alt="logo-sabzlearn" />
            </Link>
            <div className='logo-header__text-logo'>
                <h2>سبزلرن</h2>
                <h3>Sabzlearn.ir</h3>
            </div>
        </header>
    )
}
