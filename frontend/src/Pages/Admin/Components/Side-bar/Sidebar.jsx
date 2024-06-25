import React, { useState, useEffect, useRef } from 'react'
import './Sidebar.css'
import './media.css'
import { AiOutlineHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { BsBagCheck, BsCurrencyDollar } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import DeleteModal from '../Modals/DeleteModal/DeleteModal';

export default function Sidebar() {

    const [logout, setLogout] = useState(false)
    const adminSideRef = useRef()

    useEffect(() => {
        console.log('oppf');
        if (window.location.pathname.length > ("/p-admin/").length) {
            adminSideRef.current.classList.remove('active')
            console.log(("/p-admin/").length);
        }
    })

    const logoutHandle = e => {
        e.preventDefault()
        setLogout(true)
    }

    const logoutLogic = () => {
        localStorage.removeItem('admin-infos')
        localStorage.removeItem('user')
        window.location.reload(false);
    }

    return (
        <>
            <section className="admin sidebar">
                <div className='admin sidebar-div'>
                    <h1 className="admin sidebar-title">به داشبورد خود خوش آمدید</h1>

                    <ul className="admin sidebar-links">
                        <li>
                            <NavLink to="/p-admin" className={`admin sidebar-links__link`} ref={adminSideRef}>
                                <AiOutlineHome className="icon" />
                                <span>صفحه اصلی</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/courses" className={`admin sidebar-links__link`} >
                                <MdProductionQuantityLimits className="icon" />
                                <span>دوره ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/menus" className={`admin sidebar-links__link`}>
                                <BiCommentDetail className="icon" />
                                <span>دسته بندی ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/menus" className={`admin sidebar-links__link`}>
                                <BiCommentDetail className="icon" />
                                <span>منو ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/articles" className={`admin sidebar-links__link`}>
                                <BiCommentDetail className="icon" />
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
                            <NavLink to="/p-admin/orders" className={`admin sidebar-links__link`}>
                                <BsBagCheck className="icon" />
                                <span>سفارشات</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/comments" className={`admin sidebar-links__link`}>
                                <BiCommentDetail className="icon" />
                                <span>کامنت ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/p-admin/offs" className={`admin sidebar-links__link`}>
                                <BsCurrencyDollar className="icon" />
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
