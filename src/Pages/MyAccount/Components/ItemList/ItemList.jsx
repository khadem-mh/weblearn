import React from 'react'
import './ItemList.css'
import { NavLink } from 'react-router-dom';
//Funcs
import faNumber from '../../../../Functions/FaNumber/FaNumber.js';

export default function ItemList({ urlDest, titleTicket, date3Section, textTypeSupport, textStatus }) {
    return (
        <li>
            <NavLink to={urlDest}>
                <p>{titleTicket}</p>
                <div>
                    {faNumber(...date3Section)}
                    {
                        textTypeSupport &&
                        <span>{textTypeSupport}</span>
                    }
                    <span>{textStatus}</span>
                </div>
            </NavLink>
        </li>
    )
}
