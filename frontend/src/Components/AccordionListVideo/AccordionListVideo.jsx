import React from 'react'
import './AccordionListVideo.css'
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlinePlayCircle } from "react-icons/md";
import { GoLock } from "react-icons/go";

export default function AccordionListVideo({ sessionsList, shortNameCourse }) {

    return (
        <Accordion>

            <Accordion.Item className='parent-accordion-item'>
                <Accordion.Header className='parent-accordion-header'>جلسات دوره</Accordion.Header>


                {
                    sessionsList && sessionsList.length ? sessionsList.map((key, index) => (
                        <div key={index} className='container-accordion-body'>
                            <Accordion.Body className='accordion-body'>
                                <Link to={`/${key.free ? `lesson/${shortNameCourse}/${key._id}` : ''}`} className={`introduction__accordion-body ${key.free ? 'pe-auto' : 'pe-none'}`}>

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

                                </Link>
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