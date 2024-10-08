import React, { useState, useEffect, useRef, useContext, useMemo } from 'react'
import './Navbar.css'
import './media.css'
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';
import { AuthContext } from '../../Contexts/AuthContext';
import { InfosIndexPageContext } from '../../Contexts/InfosIndexPageContext';
//icons
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";

export default function Navbar() {

    const menuRef = useRef()
    const infosIndex = useContext(InfosIndexPageContext)
    const authContext = useContext(AuthContext)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [menus, setMenus] = useState([])
    const [topBar, setTopBar] = useState([])
    const [randomItem, seRandomItem] = useState([])


    useEffect(() => {
        fetch(`http://localhost:4000/v1/menus/topbar`)
            .then(res => res.json())
            .then(items => {
                setTopBar(items)
                seRandomItem(grtRandomItemsFromArray(items, 5))
            })

        fetch(`http://localhost:4000/v1/menus`)
            .then(res => res.json())
            .then(datas => {
                setMenus(datas)
            })
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            if (menuRef.current?.classList) {
                if (window.innerWidth < 893 && !menuRef.current.classList.contains('menu-show')) menuRef.current.classList.add('menu-hidden')
                else menuRef.current.classList.remove('menu-hidden')
            }

        }
        window.addEventListener('resize', handleResize)
        window.innerWidth < 893 && menuRef.current.classList.add('menu-hidden')
        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    const grtRandomItemsFromArray = (arr, randomCount) => {
        const shuffled = arr.sort(() => 0.5 - Math.random())
        return shuffled.slice(0, randomCount)
    }

    const closeNavbar = () => {
        if (menuRef.current.classList.contains('menu-hidden')) {
            menuRef.current.classList.remove('menu-hidden')
            menuRef.current.classList.add('menu-show')
        } else if (menuRef.current.classList.contains('menu-show')) {
            menuRef.current.classList.remove('menu-show')
            menuRef.current.classList.add('menu-hidden')
        }
    }

    return (
        <nav>

            <div className="top-bar">
                <div className="container-fluid">
                    <div className="top-bar__content">
                        <div className="top-bar__right">


                            <div className="d-flex flex-column">
                                <div className="text-center d-none">
                                    <div className="close-menu">
                                        <i className="fas fa-close text-light fs-3 bg-black py-2 px-3"></i>
                                    </div>
                                </div>

                                <div className="main-header__parent-search-input">
                                    <input type="text" className="main-header__search-input"
                                        id="search-global-input-menu-column" placeholder="جستجو..." />
                                    <div id="search-global-menu-column"><i
                                        className="fas fa-search main-header__search-icon"></i>
                                    </div>
                                </div>
                            </div>

                            <ul className="top-bar__menu">
                                {
                                    topBar && topBar.length && randomItem.map((item, index) => (
                                        <li key={index} className="top-bar__item">
                                            <Link to={`/course-info/${item.href}`} className="top-bar__link">{item.title}</Link>
                                        </li>
                                    ))
                                }
                            </ul>

                        </div>

                        <div className="top-bar__left">

                            <div className="top-bar__email">
                                <a href="/" className="top-bar__email-text top-bar__link">
                                    {infosIndex.email}
                                </a>
                                <i className="fas fa-envelope top-bar__email-icon"></i>
                            </div>

                            <div className="top-bar__phone">
                                <a href="/" className="top-bar__phone-text top-bar__link">
                                    {infosIndex.phone}
                                </a>
                                <i className="fas fa-phone top-bar__phone-icon"></i>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div className="main-header">
                <div className="container-fluid">
                    <div className="main-header__content">

                        <div className="main-header__parent-icon-list" onClick={() => closeNavbar()}>
                            <div className="main-header__icon-list" >
                                <i className="fas fa-list"></i>
                            </div>
                        </div>

                        <div className='logo-sabzlearn__link'>
                            <div className='logo-sabzlearn'>
                                <Link to="/">
                                    <img src="/Images/Logos/Logo-site/logo-one-copy.png" className="main-header__logo" alt="logo-weblearn" />
                                </Link>
                            </div>
                        </div>

                        <div className="main-header__right" ref={menuRef}>

                            <div onClick={() => closeNavbar()}>
                                <IoCloseOutline className='main-header__icon-close' />
                            </div>

                            <Link to="/">
                                <img src="/Images/Logos/Logo-site/logo-one-copy.png" className="main-header__logo" alt="logo-sabzlearn" />
                            </Link>

                            <div className='main-header__text-logo'>
                                <p className='sub-text-logo text-center'>SabzLearn.ir</p>
                                <hr />
                            </div>

                            <div className='main-header__mob'>

                                <ul className="main-header__menu menu-wide">
                                    {
                                        menus && menus.map((item, index) => (
                                            <li key={index} className="main-header__item">
                                                <Link to={`/${item.href}/page/1`} className="main-header__link"> {item.title}
                                                    {item.submenus.length ? <i className="fas fa-angle-down main-header__link-icon"></i> : ''}
                                                </Link>
                                                {
                                                    item.submenus && item.submenus.length ?
                                                        <ul className="main-header__dropdown">
                                                            {
                                                                item.submenus.map((subMenu, index) => (
                                                                    <li key={index} className="main-header__dropdown-item">
                                                                        <Link to={`${subMenu.href.includes('/') ? subMenu.href : `/course-info/${subMenu.href}`}`} className="main-header__dropdown-link">{subMenu.title}</Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                        : ''
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>

                                <ul className="main-header__menu menu-mobile">



                                    {
                                        menus && menus.map((item, index) => (
                                            <li key={index} className="main-header__item">
                                                <details open>
                                                    <summary key={index}>
                                                        <div className='summary-arrow'>
                                                            <Link to={`/${item.href}/page/1`}>{item.title}</Link>
                                                            {
                                                                item.submenus.length ?
                                                                    <div>
                                                                        <i className="fas fa-angle-down main-header__link-icon text-light"></i>
                                                                    </div>
                                                                    :
                                                                    ''
                                                            }
                                                        </div>
                                                    </summary>

                                                    {
                                                        item.submenus && item.submenus.length ?
                                                            <div>
                                                                {
                                                                    item.submenus.map((subMenu, index) => (
                                                                        <li key={index}>
                                                                            <Link to={`${subMenu.href.includes('/') ? subMenu.href : `/course-info/${subMenu.href}`}`} className="main-header__dropdown-link">{subMenu.title}</Link>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </div>
                                                            : ''
                                                    }
                                                </details>
                                            </li>
                                        ))
                                    }




                                </ul>

                                <div className='search-input-menu-tower'>
                                    <SearchInput w={'24rem'} h={'3.9rem'} fz={'.8em'} iconFz={'1em'} />
                                </div>

                            </div>

                        </div>

                        <div className="main-header__left">

                            <div className='search-input-menu-desk'>
                                <SearchInput w={'24rem'} h={'3.9rem'} fz={'.8em'} iconFz={'1em'} />
                            </div>

                            <Link to={authContext.isLoggedIn && authContext.userInfos.role === 'USER' ? '/my-account' : authContext.isLoggedIn && authContext.userInfos.role === 'ADMIN' ? '/p-admin' : '/register'} className="main-header__profile">
                                <div className='d-none d-sm-block'>
                                    <p className='main-header__profile-text'>{authContext.token ? authContext.userInfos.name : 'ورود |  عضویت'}</p>
                                </div>
                                <div className='main-header__profile-icon'>
                                    <HiOutlineUser className='main-header__icon-user' />
                                </div>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>

        </nav >
    )
}
