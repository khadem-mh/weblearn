import React from 'react'
import './Tickets.css'
//Icons
import { HiOutlineTicket } from "react-icons/hi2";
import { HiOutlineMailOpen } from "react-icons/hi";
import { TfiComments } from "react-icons/tfi";
import { BsPlusCircle } from "react-icons/bs";

import StatusBoxAccount from '../../Components/StatusBoxAccount/StatusBoxAccount'
//Funcs
import faNumber from '../../../../Functions/FaNumber/FaNumber.js';

export default function Tickets() {
  return (
    <div>

      <section className='account-page-first__header'>
        <div>
          <StatusBoxAccount bgColorBox={'rgba(255, 225, 0, .9)'} logo={<HiOutlineTicket />} title={'همه تیکت ها'} subTitle={` ${faNumber(10)} دوره`} />
          <StatusBoxAccount bgColorBox={'rgba(78, 129, 251, .9)'} logo={< HiOutlineMailOpen />} title={'تیکت های باز'} subTitle={` ${faNumber(3)} دوره`} />
          <StatusBoxAccount bgColorBox={'rgba(46, 213, 115, .9)'} logo={<TfiComments />} title={'بسته شده'} subTitle={`${faNumber(7)} دوره`} />
        </div>

        <div>
          <StatusBoxAccount bgColorBox={'#4E81FB'} logo={<BsPlusCircle />} subTitle={'تیکت جدید'} />
        </div>
      </section>

    </div>
  )
}
