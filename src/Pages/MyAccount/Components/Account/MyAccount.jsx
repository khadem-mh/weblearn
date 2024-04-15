import React, { useEffect, useState } from 'react'
import './MyAccount.css'
import { NavLink, useLocation } from 'react-router-dom';
//Components
import LogoHeader from '../../../../Components/LogoHeader/LogoHeader'
//icons
import { AiOutlineHome } from "react-icons/ai";
import { VscFolderLibrary } from "react-icons/vsc";
import { GoCommentDiscussion } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi2";
import { GrLogout } from "react-icons/gr";
import { IoNotificationsOutline } from "react-icons/io5";

export default function MyAccount({ children }) {

    const location = useLocation()

    return (
        <div className='page-account'>

            <section className='account-sidbar'>
                <LogoHeader srcLogo={'/Images/Logos/Logo-site/logo-one-copy.png'} imgW={'93px'} titleFz={'4.3rem'} subTitleFz={'1rem'} />
                <aside className='account-sidbar__parent'>
                    <ul className='account-sidbar__menu'>
                        <li className='account-sidbar__li'>
                            <NavLink to={'/my-account'} className={location.pathname === '/my-account' || location.pathname === '/my-account/' ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                                <AiOutlineHome />
                                <span>پیشخوان</span>
                            </NavLink>
                        </li>
                        <li className='account-sidbar__li'>
                            <NavLink to={'/my-account/my-courses'} className={link => link.isActive ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                                <VscFolderLibrary />
                                <span>دوره های من</span>
                            </NavLink>
                        </li>
                        <li className='account-sidbar__li'>
                            <NavLink to={'/my-account/tickets'} className={link => link.isActive ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                                <GoCommentDiscussion />
                                <span>تیکت ها</span>
                            </NavLink>
                        </li>
                        <li className='account-sidbar__li'>
                            <NavLink to={'/my-account/details-account'} className={link => link.isActive ? 'account-sidbar__link account-sidbar__active' : 'account-sidbar__link'}>
                                <HiOutlineUser />
                                <span>جزئیات حساب</span>
                            </NavLink>
                        </li>
                        <li className='account-sidbar__li'>
                            <NavLink to={'/'} className='account-sidbar__link'>
                                <GrLogout />
                                <span>خروج</span>
                            </NavLink>
                        </li>
                    </ul>
                </aside>
            </section>

            <section className='account-content'>
                <section className='account-content__header'>
                    <div>
                        <h2 className='account-content__title'>محمدحسین عزیز؛ خوش اومدی 🙌</h2>
                    </div>
                    <div className='account-content__header-left'>
                        <div className='account-content__parent-notif'>
                            <IoNotificationsOutline className='account-content__notif' />
                        </div>
                        <img src="/Images/Logos/Logo-account/logoAccount.png" alt="logo-account" className='account-content__prof' />
                    </div>
                </section>
                <section>
                    {children}
                </section>
            </section>

        </div>
    )
}
