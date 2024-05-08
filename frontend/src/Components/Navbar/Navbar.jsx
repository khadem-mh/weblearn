import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css'
import './media.css'
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';
//icons
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";

export default function Navbar() {

    const menuRef = useRef()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            if (window.innerWidth < 893 && !menuRef.current.classList.contains('menu-show')) {
                menuRef.current.classList.add('menu-hidden')
            } else {
                menuRef.current.classList.remove('menu-hidden')
            }
        }

        window.addEventListener('resize', handleResize)

        if (window.innerWidth < 893) {
            menuRef.current.classList.add('menu-hidden')
        }

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [windowWidth])

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
                                <li className="top-bar__item"><a href="/" className="top-bar__link">آموزش HTML</a></li>
                                <li className="top-bar__item"><a href="/" className="top-bar__link">آموزش CSS</a></li>
                                <li className="top-bar__item"><a href="/" className="top-bar__link">آموزش JS</a></li>
                                <li className="top-bar__item"><a href="/" className="top-bar__link">آموزش BOOTSTRAP</a></li>
                                <li className="top-bar__item"><a href="/" className="top-bar__link">آموزش PYTHON</a></li>
                                <li className="top-bar__item"><a href="/" className="top-bar__link">آموزش REACT</a></li>
                            </ul>

                        </div>

                        <div className="top-bar__left">

                            <div className="top-bar__email">
                                <a href="/" className="top-bar__email-text top-bar__link">
                                    sabz@gmail.com
                                </a>
                                <i className="fas fa-envelope top-bar__email-icon"></i>
                            </div>

                            <div className="top-bar__phone">
                                <a href="/" className="top-bar__phone-text top-bar__link">
                                    09031335939
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
                                    <img src="./Images/Logos/Logo-site/logo-one-copy.png" className="main-header__logo" alt="logo-sabzlearn" />
                                </Link>
                            </div>
                        </div>

                        <div className="main-header__right" ref={menuRef}>

                            <div onClick={() => closeNavbar()}>
                                <IoCloseOutline className='main-header__icon-close' />
                            </div>

                            <Link to="/">
                                <img src="./Images/Logos/Logo-site/logo-one-copy.png" className="main-header__logo" alt="logo-sabzlearn" />
                            </Link>

                            <div className='main-header__text-logo'>
                                <p className='sub-text-logo text-center'>SabzLearn.ir</p>
                                <hr />
                            </div>

                            <div className='main-header__mob'>

                                <ul className="main-header__menu menu-wide">

                                    <li className="main-header__item">
                                        <a href="/" className="main-header__link">فرانت اند
                                            <i className="fas fa-angle-down main-header__link-icon"></i>
                                        </a>
                                        <ul className="main-header__dropdown">
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش HTML</a></li>
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش CSS</a></li>
                                        </ul>
                                    </li>
                                    <li className="main-header__item">
                                        <a href="/" className="main-header__link">بک اند
                                            <i className="fas fa-angle-down main-header__link-icon"></i>
                                        </a>
                                        <ul className="main-header__dropdown">
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش HTML</a></li>
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش CSS</a></li>
                                        </ul>
                                    </li>
                                    <li className="main-header__item">
                                        <a href="/" className="main-header__link"> پایتون
                                            <i className="fas fa-angle-down main-header__link-icon"></i>
                                        </a>
                                        <ul className="main-header__dropdown">
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش HTML</a></li>
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش CSS</a></li>
                                        </ul>
                                    </li>
                                    <li className="main-header__item">
                                        <a href="/" className="main-header__link"> مهارت های نرم
                                            <i className="fas fa-angle-down main-header__link-icon"></i>
                                        </a>
                                        <ul className="main-header__dropdown">
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش HTML</a></li>
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش CSS</a></li>
                                        </ul>
                                    </li>
                                    <li className="main-header__item">
                                        <a href="/" className="main-header__link"> دسکتاپ
                                            <i className="fas fa-angle-down main-header__link-icon"></i>
                                        </a>
                                        <ul className="main-header__dropdown">
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش HTML</a></li>
                                            <li className="main-header__dropdown-item"><a href="/"
                                                className="main-header__dropdown-link">آموزش CSS</a></li>
                                        </ul>
                                    </li>

                                </ul>

                                <ul className="main-header__menu menu-mobile">
                                    <li className="main-header__item">

                                        <details>
                                            <summary>
                                                <div className='summary-arrow'>
                                                    <p>مهارت های شبکه</p>
                                                    <div>
                                                        <i className="fas fa-angle-down main-header__link-icon text-light"></i>
                                                    </div>
                                                </div>
                                            </summary>

                                            <div>
                                                <p><a href='/'>برنامه نویسی جاوااسکریپت</a></p>
                                                <p><a href='/'>متخصص React Js</a></p>
                                                <p><a href='/'>Dart</a></p>
                                            </div>
                                        </details>


                                    </li>
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

                            <Link to="/register" className="main-header__profile">
                                <div className='d-none d-sm-block'>
                                    <p className='main-header__profile-text'> ورود |  عضویت</p>
                                </div>
                                <div className='main-header__profile-icon'>
                                    <HiOutlineUser className='main-header__icon-user' />
                                </div>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>

        </nav>
    )
}
