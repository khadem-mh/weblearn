import React, { useEffect, useState } from 'react'
import './Header.css'
import './media.css'
import { Row, Col } from 'react-bootstrap'
import { AiOutlineBell } from 'react-icons/ai'
import { BsBrightnessHigh } from 'react-icons/bs'
import { IoSearch } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

export default function Header({ children, isLightMode, setIsLightMode, adminNotif }) {

    const [isShowAdminNotification, setIsShowAdminNotification] = useState(false)
    const [adminNotification, setAdminNotification] = useState(adminNotif)

    const seeNotifHandler = notifID => {
        fetch(`https://kind-tips-jam.loca.lt/v1/notifications/see/${notifID}`, {
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
                        <button className={`header-left-icon search-icon-nav d-auto d-lg-none`}>
                            <IoSearch className='header-icon' />
                        </button>

                        <div className="search-box d-none d-lg-flex">
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