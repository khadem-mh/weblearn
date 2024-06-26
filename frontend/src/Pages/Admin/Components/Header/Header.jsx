import React, { useEffect, useRef, useState } from 'react'
import './Header.css'
import './media.css'
import { Row, Col } from 'react-bootstrap'
import { AiOutlineBell } from 'react-icons/ai'
import { BsBrightnessHigh } from 'react-icons/bs'
import { IoSearch } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

export default function Header({ children, isLightMode, setIsLightMode, adminNotif }) {

    const [isShowInput, setIsShowInput] = useState(false)
    const [isShowAdminNotification, setIsShowAdminNotification] = useState(false)
    const [adminNotification, setAdminNotification] = useState(adminNotif)
    const searchBoxRef = useRef()

    useEffect(() => {

        function contrloWidthForShowSearchBox() {
            if (window.innerWidth <= 992) {
                searchBoxRef.current.classList.contains('show-search-icon') && searchBoxRef.current.classList.remove('show-search-icon')
                searchBoxRef.current.classList.add('hidden-search-icon')
            } else {
                searchBoxRef.current.classList.contains('hidden-search-icon') && searchBoxRef.current.classList.remove('hidden-search-icon')
                searchBoxRef.current.classList.add('show-search-icon')
            }
        }

        contrloWidthForShowSearchBox()

        window.addEventListener('resize', contrloWidthForShowSearchBox)
        return () => window.removeEventListener('resize', contrloWidthForShowSearchBox)

    }, [window.innerWidth])

    useEffect(() => {

        const handleClick = event => {
            searchBoxRef.current.classList.remove('hidden-search-icon')
            searchBoxRef.current.classList.add('show-search-icon')
            let getPositionElem = searchBoxRef.current.getBoundingClientRect()

            if (
                event.clientY < getPositionElem.top ||
                event.clientY > (getPositionElem.top + getPositionElem.height) ||
                event.clientX > (getPositionElem.left + getPositionElem.width) ||
                event.clientX < getPositionElem.left
            ) {
                searchBoxRef.current.classList.remove('show-search-icon')
                searchBoxRef.current.classList.add('hidden-search-icon')
            }

        }

        isShowInput && window.addEventListener('click', event => handleClick(event))
        return () => window.removeEventListener('click', handleClick)

    }, [isShowInput])
 
    const seeNotifHandler = notifID => {
        fetch(`http://localhost:4000/v1/notifications/see/${notifID}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                let adminNotifFilter = adminNotification.filter(notif => notif._id !== notifID)
                setAdminNotification(adminNotifFilter)
            })
    }

    const handleButtonClick = () => {
        setIsLightMode(prev => {
            localStorage.setItem('light-mode', JSON.stringify(`${!prev}`))
            return !prev
        });
        document.documentElement.classList.toggle('light-mode')

    };

    return (
        <>
            <section className='parent-header'>
                <Row className='admin header'>

                    {children}

                    <Col className='header-left-section'>
                        <button className={`header-left-icon search-icon-nav d-auto d-lg-none`} onClick={e => setIsShowInput(true)}>
                            <IoSearch className='header-icon' />
                        </button>

                        <div className="search-box" ref={searchBoxRef}>
                            <input type="text" placeholder='جست و جو بکنید ...' />
                            <button>جست و جو</button>
                        </div>



                        <button className='header-left-icon' onMouseEnter={() => setIsShowAdminNotification(true)}>
                            <AiOutlineBell className='header-icon' />
                        </button>

                        <ul className={`admin-notif ${isShowAdminNotification ? 'open-notif' : 'close-notif'}`} onMouseEnter={() => setIsShowAdminNotification(true)} onMouseLeave={() => setIsShowAdminNotification(false)}>

                            {
                                adminNotification && adminNotification.length ?
                                    adminNotification.map((notif, index) => (
                                        <li key={index} className='admin-notif__li' >
                                            <p>{notif.msg}</p>
                                            <span className='admin-notif__show' onClick={() => seeNotifHandler(notif._id)}>دیدم</span>
                                        </li>
                                    ))
                                    :
                                    <li className='admin-notif__li'>
                                        <span className='admin-notif__show mx-0'>هیچ اعلانی دریافت نکرده اید</span>
                                    </li>
                            }


                        </ul>


                        <button className='header-left-icon' onClick={handleButtonClick} >
                            {isLightMode ? <BsBrightnessHigh className='header-icon' /> : <IoMoonOutline className='header-icon' />}
                        </button>
                    </Col>
                </Row >
            </section >
        </>
    )
}