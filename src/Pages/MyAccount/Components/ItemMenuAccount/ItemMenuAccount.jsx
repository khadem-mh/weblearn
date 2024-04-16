import React from 'react'
import './ItemMenuAccount.css'
import { NavLink, useLocation } from 'react-router-dom';

export default function ItemMenuAccount({ logo, title, path, mainPath = false, liMargin, fzTitle }) {

    const location = useLocation()

    return (
        <>
            {
                mainPath ?
                    <li className='account-sidbar__li' style={{ margin: liMargin }}>
                        <NavLink to={'/my-account'} className={location.pathname === '/my-account' || location.pathname === '/my-account/' ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                            {logo}
                            <span style={{ fontSize: fzTitle }}>{title}</span>
                        </NavLink>
                    </li>
                    :
                    <li className='account-sidbar__li' style={{ margin: liMargin }}>
                        <NavLink to={`/${path}`} className={link => link.isActive ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                            {logo}
                            <span style={{ fontSize: fzTitle }}>{title}</span>
                        </NavLink>
                    </li>
            }
        </>
    )
}
