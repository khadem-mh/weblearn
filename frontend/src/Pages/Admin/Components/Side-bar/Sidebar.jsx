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
        window.location.pathname.length > ("/p-admin/").length && adminSideRef.current.classList.remove('active')
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
                            <NavLink to="/p-admin" className={`admin sidebar-links__link`} ref={adminSideRef}>
                                <AiOutlineHome className="icon" />
                                <span>صفحه اصلی</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/courses" className={`admin sidebar-links__link`} >
                                <MdOutlineAssessment className="icon" />
                                <span>دوره ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/sessions" className={`admin sidebar-links__link`} >
                                <SiGooglemeet className="icon" />
                                <span>جلسات</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/categories" className={`admin sidebar-links__link`}>
                                <BiCategoryAlt className="icon" />
                                <span>دسته بندی ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/menus" className={`admin sidebar-links__link`}>
                                <RiMenu2Fill className="icon" />
                                <span>منو ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/articles" className={`admin sidebar-links__link`}>
                                <GrArticle className="icon" />
                                <span>مقالات</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/users" className={`admin sidebar-links__link`}>
                                <FiUsers className="icon" />
                                <span>کاربران</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/comments" className={`admin sidebar-links__link`}>
                                <BiCommentDetail className="icon" />
                                <span>کامنت ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/contacts" className={`admin sidebar-links__link`}>
                                <TbMessages className="icon" />
                                <span>پیغام ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/offs" className={`admin sidebar-links__link`}>
                                <BiSolidOffer className="icon" />
                                <span>تخفیف ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <Link to="/" className={`admin sidebar-links__link`} onClick={e => logoutHandle(e)}>
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
