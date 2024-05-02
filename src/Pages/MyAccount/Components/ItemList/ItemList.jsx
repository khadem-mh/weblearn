import React from 'react'
import './ItemList.css'
import { NavLink } from 'react-router-dom';
//Funcs
import faNumber from '../../../../Functions/FaNumber/FaNumber.js';

export default function ItemList({ urlDest, titleTicket, date3Section, textTypeSupport, textStatus, textEmpty, statusQues }) {
    return (
        <li className='li-item'>
            {
                textEmpty
                    ?
                    <p className='text-empty-list'>{textEmpty}</p>
                    :
                    <>
                        <NavLink to={urlDest}>
                            <p className='li-item__title'>{titleTicket}</p>
                        </NavLink>
                        <div className='li-item__list'>
                            <p className='li-item__list-date'>{faNumber(...date3Section)}</p>
                            {
                                textTypeSupport &&
                                <span className='li-item__status'>{textTypeSupport}</span>
                            }
                            {
                                statusQues && statusQues.length &&
                                <span className={`li-item__status li-item__status-close`}>{statusQues}</span>
                            }
                            <span className={`li-item__status ${textStatus ? 'li-item__status-open' : 'li-item__status-close'}`}>{textStatus ? 'open ' : 'close'}</span>
                        </div>
                    </>
            }
        </li>
    )
}
