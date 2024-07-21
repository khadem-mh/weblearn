import React, { useState, useEffect, useRef } from 'react'
import './Sidebar.css'
import './media.css'
import { Link, NavLink } from 'react-router-dom';
//
import { AiOutlineHome } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { SiGooglemeet } from "react-icons/si";
import { MdOutlineAssessment } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { RiMenu2Fill } from "react-icons/ri";
import { GrArticle } from "react-icons/gr";
import { TbMessages } from "react-icons/tb";
import { BiSolidOffer } from "react-icons/bi";


import DeleteModal from '../Modals/DeleteModal/DeleteModal';

export default function Sidebar() {

    const [logout, setLogout] = useState(false)
    const adminSideRef = useRef()

    useEffect(() => {
        console.log(window.location.pathname);
        if (
            window.location.pathname === '/p-admin' ||
            window.location.pathname === '/p-admin/'
        ) {
            adminSideRef.current.classList.add('active')
        } else {
            adminSideRef.current.classList.remove('active')
        }
    })

    const logoutHandle = e => {
        e.preventDefault()
        setLogout(true)
    }

    const logoutLogic = () => {
        localStorage.clear()
        window.location.reload(false);
    }

    return (
        <>
            <section className="admin sidebar">
                <div className='admin sidebar-div'>

                    <Link to={'/'} className='logo-on-adminpanel'>
                        <img src="/Images/Logos/Logo-site/logo-one-copy.png" alt="logo" />
                    </Link>

                    <ul className="admin sidebar-links">
                        <li>
                            <NavLink to="/p-admin" title='لیست دوره ها' className={`admin sidebar-links__link admin-panel-home-s`} style={{ marginTop: `${window.location.pathname === '/p-admin' || window.location.pathname === '/p-admin/' ? '15rem' : '0'}` }} ref={adminSideRef}>
                                <AiOutlineHome className="icon" />
                                <span>صفحه اصلی</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/courses" className={`admin sidebar-links__link`} title='لیست دوره ها'>
                                <MdOutlineAssessment className="icon" />
                                <span>دوره ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/sessions" className={`admin sidebar-links__link`} title='جلسات دوره ها'>
                                <SiGooglemeet className="icon" />
                                <span>جلسات</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/categories" className={`admin sidebar-links__link`} title='دسته بندی ها'>
                                <BiCategoryAlt className="icon" />
                                <span>دسته بندی ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/menus" className={`admin sidebar-links__link`} title='منوها'>
                                <RiMenu2Fill className="icon" />
                                <span>منو ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/articles" className={`admin sidebar-links__link`} title='مقالات'>
                                <GrArticle className="icon" />
                                <span>مقالات</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/users" className={`admin sidebar-links__link`} title='لیست کاربران'>
                                <FiUsers className="icon" />
                                <span>کاربران</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/comments" className={`admin sidebar-links__link`} title='نظرات کاربران'>
                                <BiCommentDetail className="icon" />
                                <span>کامنت ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/contacts" className={`admin sidebar-links__link`} title='پیغام ها'>
                                <TbMessages className="icon" />
                                <span>پیغام ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/tickets" className={`admin sidebar-links__link`} title='تیکت ها'>
                                <BiCommentDetail className="icon" />
                                <span>تیکت ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/offs" className={`admin sidebar-links__link`} title='ساخت کد تخفیف'>
                                <BiSolidOffer className="icon" />
                                <span>تخفیف ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/discounts" className={`admin sidebar-links__link`} title='برگزاری کمپین'>
                                <BiSolidOffer className="icon" />
                                <span>تخفیف همگانی</span>
                            </NavLink>
                        </li>
                        <li >
                            <Link to="/" className={`admin sidebar-links__link`} onClick={e => logoutHandle(e)} title='خروج از حساب کاربری'>
                                <IoLogOutOutline className="icon" />
                                <span>خروج</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>

            {
                logout &&
                <DeleteModal title={'آیا از خروج خود اطمینان دارید؟'} cancleAction={() => setLogout(false)} submitAction={logoutLogic} />
            }

        </>
    )

}
