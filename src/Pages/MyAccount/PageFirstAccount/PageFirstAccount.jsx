import React from 'react'
import './PageFirstAccount.css'
import StatusBoxAccount from '../Components/StatusBoxAccount/StatusBoxAccount'
//components
import ItemList from '../Components/ItemList/ItemList';
//icons
import { HiOutlineCreditCard, HiOutlineRocketLaunch, HiOutlineTicket } from "react-icons/hi2";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
//Funcs
import faNumber from '../../../Functions/FaNumber/FaNumber';

export default function PageFirstAccount() {
  return (
    <div className='account-page-first'>
      <section className='account-page-first__header'>
        <StatusBoxAccount bgColorBox={'#FACC15'} logo={<HiOutlineCreditCard />} title={'مجموع پرداخت ها'} subTitle={` ${faNumber(1165500)} تومان`} />
        <StatusBoxAccount bgColorBox={'#4E81FB'} logo={<HiOutlineRocketLaunch />} title={'دوره های من'} subTitle={` ${faNumber(10)} دوره`} />
        <StatusBoxAccount bgColorBox={'#F43F5E'} logo={<HiOutlineTicket />} title={'مجموع تیکت ها'} subTitle={` ${faNumber(3)} تیکت`} />
        <StatusBoxAccount bgColorBox={'#2ED573'} logo={<FaMoneyBillTrendUp />} title={'موجودی حساب'} subTitle={` 0 تومان`} />
      </section>

      <section className='account-page-first__content'>

        <div className='account-page-first__content-parent-top'>
          <div className='account-page-first__content-top'>
            <p>اخیرا مشاهده شده</p>
            <div className='account-page-first__content-top-left'>
              <p>همه دوره های ثبت نام شده</p>
              <HiOutlineArrowLeft />
            </div>
          </div>
        </div>

        <div className='account-page-first__content-bottom'>

          <div className='account-page-first__content-tickets'>
            <div className='account-page-first__content-tickets-header'>
              <p>تیکت های اخیر</p>
              <div>
                <p>همه تیکت ها</p>
                <HiOutlineArrowLeft />
              </div>
            </div>

            <div className='account-page-first__content-tickets-body'>
              <ul className='account-page-first__content-tickets-list'>
                <ItemList urlDest={'/'} textStatus={false} titleTicket={'گروه تلگرام'} date3Section={[1402, 10, 5]} />
              </ul>
            </div>
          </div>

          <div className='account-page-first__content-queses'>
            <p>پرسش های اخیر</p>

            <div className='account-page-first__content-queses-body'>
              <ul className='account-page-first__content-queses-list'>
                <ItemList urlDest={'/'} textStatus={false} titleTicket={'گروه واتساپ'} date3Section={[1402, 10, 7]} />
              </ul>
            </div>
          </div>

        </div>

      </section>

    </div>
  )
}
