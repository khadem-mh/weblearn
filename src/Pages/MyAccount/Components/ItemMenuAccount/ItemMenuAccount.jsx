import React from 'react'
import './ItemMenuAccount.css'
import { NavLink, useLocation } from 'react-router-dom';

export default function ItemMenuAccount({ logo, title, path, mainPath = false }) {

    const location = useLocation()

    return (
        <>
            {
                mainPath ?
                    <li className='account-sidbar__li'>
                        <NavLink to={'/my-account'} className={location.pathname === '/my-account' || location.pathname === '/my-account/' ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                            {logo}
                            <span>{title}</span>
                        </NavLink>
                    </li>
                    :
                    <li className='account-sidbar__li'>
                        <NavLink to={`/${path}`} className={link => link.isActive ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                            {logo}
                            <span>{title}</span>
                        </NavLink>
                    </li>
            }
        </>
    )
}
