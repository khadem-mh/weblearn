import React from 'react'
import './AccordionListVideo.css'
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlinePlayCircle } from "react-icons/md";
import { GoLock } from "react-icons/go";

export default function AccordionListVideo({ obj }) {

    const keyObj = Object.keys(obj)
    console.log(keyObj);
    return (
        <Accordion>

            {
                keyObj.map((key, index) => (
                    <Accordion.Item eventKey={index + 1} className='parent-accordion-item'>
                        <Accordion.Header className='parent-accordion-header'>{key}</Accordion.Header>

                        {
                            obj[key].length
                                ?
                                obj[key].map((item, index) => (
                                    <div className='container-accordion-body'>
                                        <Accordion.Body className='accordion-body'>
                                            <Link to={`/${item.isFree ? item.to : ''}`} className={`introduction__accordion-body ${item.isFree ? 'pe-auto' : 'pe-none'}`}>

                                                <div className="introduction__accordion-right">
                                                    <div className='d-flex align-items-center'>
                                                        <span className="introduction__accordion-count">{index + 1}</span>

                                                        <p className="introduction__accordion-link">{item.textBody}</p>

                                                    </div>
                                                    <p className='introduction__accordion-price'>{item.hasPriceText}</p>
                                                </div>

                                                <div className="introduction__accordion-left">
                                                    <span className="introduction__accordion-time">
                                                        <span>{item.time}</span>
                                                        {
                                                            item.isFree ?
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

                ))
            }



        </Accordion >
    )
}