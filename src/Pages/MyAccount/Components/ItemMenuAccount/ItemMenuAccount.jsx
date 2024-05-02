import React, { useEffect } from 'react'
import './ItemMenuAccount.css'
import { NavLink, useLocation } from 'react-router-dom';

export default function ItemMenuAccount({ logo, title, path, mainPath = false, liMargin, fzTitle }) {

    const location = useLocation()

    useEffect(() => {
        const itemSelect = document.querySelectorAll('.account-sidbar__link')
        if (location.pathname === '/my-account/add-ticket' || location.pathname === '/my-account/tickets')
            Array.from(itemSelect).map(item => item.href.includes('/my-account/tickets') && item.classList.add('account-sidbar__active'))
        else
            Array.from(itemSelect).map(item => item.href.includes('/my-account/tickets') && item.classList.remove('account-sidbar__active'))

    })

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
                        <NavLink to={`${path}`} className={link => link.isActive ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                            {logo}
                            <span style={{ fontSize: fzTitle }}>{title}</span>
                        </NavLink>
                    </li>
            }
        </>
    )
}
