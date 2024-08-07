import React, { useContext } from 'react'
import './AccordionListVideo.css'
import { NavLink, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlinePlayCircle } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { AuthContext } from '../../Contexts/AuthContext';
import swal from 'sweetalert';

export default function AccordionListVideo({ sessionsList, shortNameCourse }) {

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const clickHandler = e => {
        if (!authContext.isLoggedIn) {
            e.preventDefault()
            swal({
                title: 'برای دیدن ویدیو ها لطفا در سایت لاگین کنید',
                icon: 'warning',
                buttons: 'باشه'
            }).then(() => {
                navigate('/login')
            })
        }
    }

    return (
        <Accordion>

            <Accordion.Item className='parent-accordion-item'>
                <Accordion.Header className='parent-accordion-header'>جلسات دوره</Accordion.Header>


                {
                    sessionsList && sessionsList.length ? sessionsList.map((key, index) => (
                        <div key={index} className='container-accordion-body'>
                            <Accordion.Body className='accordion-body'>
                                <NavLink to={`/${key.free === 1 ? `lesson/${shortNameCourse}/${key._id}` : ''}`} className={`introduction__accordion-body ${key.free ? 'pe-auto' : 'pe-none'}`}
                                    style={({ isActive }) => {
                                        return {
                                            backgroundColor: isActive ? "gray" : "",
                                            borderRadius: isActive ? '1rem' : "",
                                            padding: isActive ? '1rem' : "",
                                            marginBottom: isActive ? '.5rem' : "",
                                        }
                                    }} onClick={e => clickHandler(e)}>

                                    <div className="introduction__accordion-right">
                                        <div className='d-flex align-items-center'>
                                            <span className="introduction__accordion-count">{index + 1}</span>

                                            <p className="introduction__accordion-link">{key.title}</p>

                                        </div>
                                    </div>

                                    <div className="introduction__accordion-left">
                                        <span className="introduction__accordion-time">
                                            <span>{key.time}</span>
                                            {
                                                key.free ?
                                                    <MdOutlinePlayCircle className='introduction__accordion-icon mb-1' />
                                                    :
                                                    <GoLock className='introduction__accordion-icon mb-1' />
                                            }
                                        </span>
                                    </div>

                                </NavLink>
                            </Accordion.Body>
                        </div>
                    ))

                        :
                        <Accordion.Body>
                            <p className='sesson-empty'>فعلا هیچ دوره ای برای این فصل قرار نگرفته است</p>
                        </Accordion.Body>

                }

            </Accordion.Item>


        </Accordion >
    )
}