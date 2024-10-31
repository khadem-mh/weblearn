import React, { useState, useEffect } from "react"
//Css
import './Css/custom.css'
import './Css/style.css'
import './Css/medias.css'
import { Link, useLocation, Outlet } from "react-router-dom"
import { Col } from 'react-bootstrap'
//Components
import Header from "./Components/Header/Header"
import Sidebar from "./Components/Side-bar/Sidebar"


export default function AdminPanel() {

    const location = useLocation()
    // states
    const [isLightMode, setIsLightMode] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const [adminInfos, setAdminInfos] = useState([])

    useEffect(() => {
        location.pathname.includes('p-admin/admin') && setAdminInfos(JSON.parse(localStorage.getItem('admin-infos')))
    }, [location.pathname])

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const adminToken = JSON.parse(localStorage.getItem('user')).token

            fetch(`https://kind-tips-jam.loca.lt/v1/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                }
            })
                .then(res => res.json())
                .then(adminInfos => {
                    if (adminInfos.role === 'ADMIN') {
                        setAdminInfos(adminInfos)
                        setIsAdmin(true)
                        localStorage.setItem('admin-infos', JSON.stringify({ ...adminInfos }))
                    }
                })
        }

        if (JSON.parse(localStorage.getItem('light-mode')) === null) localStorage.setItem('light-mode', JSON.stringify('false'))

        else {
            if (JSON.parse(localStorage.getItem('light-mode')) === "true") {
                setIsLightMode(true)
                document.documentElement.classList.add('light-mode')
            } else {
                setIsLightMode(false)
                document.documentElement.classList.remove('light-mode')
            }
        }
    }, [])

    return (
        isAdmin &&
        <section className="test-admin-panel">
            <Sidebar />

            <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode} adminNotif={adminInfos.notifications} >
                <Col className="admin-profile">
                    <Link to={'admin'} ><img src={`/Images/teachers/${adminInfos.profile}`} alt="Admin Profile" /></Link>
                    <div>
                        <Link to={'admin'} ><h1>{adminInfos.name}</h1></Link>
                        <h3>{adminInfos.username}</h3>
                    </div>
                </Col>
            </Header>

            <section className="App">
                <div className="content-middle-cms">
                    <Outlet />
                </div>
            </section>

        </section>
    )
}