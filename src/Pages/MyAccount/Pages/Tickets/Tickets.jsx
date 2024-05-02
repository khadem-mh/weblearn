import React from 'react'
import './Tickets.css'
import { Link } from 'react-router-dom';
//components
import HeaderList from '../../Components/HeaderList/HeaderList';
import ItemList from '../../Components/ItemList/ItemList';
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
    <div className='account-page-my-courses'>

      <section className='statusbox-page-tickets'>
        <div className='account-page-first__header'>
          <StatusBoxAccount bgColorBox={'rgba(255, 225, 0, .9)'} logo={<HiOutlineTicket />} title={'همه تیکت ها'} subTitle={` ${faNumber(10)} دوره`} />
          <StatusBoxAccount bgColorBox={'rgba(78, 129, 251, .9)'} logo={< HiOutlineMailOpen />} title={'تیکت های باز'} subTitle={` ${faNumber(3)} دوره`} />
          <StatusBoxAccount bgColorBox={'rgba(46, 213, 115, .9)'} logo={<TfiComments />} title={'بسته شده'} subTitle={`${faNumber(7)} دوره`} />
        </div>

        <div className='statusbox-page-tickets__left' >
          <Link to={'/my-account/add-ticket'}> <StatusBoxAccount bgColorBox={'#4E81FB'} logo={<BsPlusCircle />} subTitle={'تیکت جدید'} /></Link>
        </div>
      </section>

      <div className='content-left__bottom'>
        <div className='content-left__header'>
          <HeaderList title={'تیکت ها'} linkActive={false} />
        </div>

        <ul className='content-left__list'>
          <ItemList urlDest={'/'} textStatus={true} titleTicket={'گروه واتساپ'} date3Section={[1402, 10, 7]} statusQues={'پشتیبانی'} />
          <ItemList urlDest={'/'} textStatus={false} titleTicket={'گروه تلگرام'} date3Section={[1402, 10, 7]} statusQues={'پشتیبانی'} />
          <ItemList urlDest={'/'} textStatus={true} titleTicket={'گروه لینکدین برای چی این جا است'} date3Section={[1402, 10, 7]} statusQues={'پشتیبانی'} />
          <ItemList urlDest={'/'} textStatus={false} titleTicket={'دپارتمان 133 سبزلرن کجاست'} date3Section={[1402, 10, 7]} statusQues={'پشتیبانی'} />
        </ul>
      </div>

    </div>
  )
}
