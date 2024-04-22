import React from 'react'
import './PageFirstAccount.css'
import './media.css'
import StatusBoxAccount from '../../Components/StatusBoxAccount/StatusBoxAccount'
//components
import HeaderList from '../../Components/HeaderList/HeaderList';
import ItemList from '../../Components/ItemList/ItemList';
import BoxcourseImg from '../../Components/BoxcourseImg/BoxcourseImg.jsx';
//icons
import { HiOutlineCreditCard, HiOutlineRocketLaunch, HiOutlineTicket } from "react-icons/hi2";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
//Funcs
import faNumber from '../../../../Functions/FaNumber/FaNumber.js';

export default function PageFirstAccount() {
  return (
    <div className='account-page-first'>

      <section className='account-page-first__header'>
        <StatusBoxAccount bgColorBox={'rgba(255, 225, 0, .8)'} logo={<HiOutlineCreditCard />} title={'مجموع پرداخت ها'} subTitle={` ${faNumber(1165500)} تومان`} />
        <StatusBoxAccount bgColorBox={'rgba(78, 129, 251, .8)'} logo={<HiOutlineRocketLaunch />} title={'دوره های من'} subTitle={` ${faNumber(10)} دوره`} />
        <StatusBoxAccount bgColorBox={'rgba(244, 63, 94, .8)'} logo={<HiOutlineTicket />} title={'مجموع تیکت ها'} subTitle={` ${faNumber(3)} تیکت`} />
        <StatusBoxAccount bgColorBox={'rgba(46, 213, 115, .8)'} logo={<FaMoneyBillTrendUp />} title={'موجودی حساب'} subTitle={` 0 تومان`} />
      </section>

      <section className='account-page-first__content'>

        <section className='account-page-first__content-right'>
          <HeaderList textLink={'همه دوره های ثبت نام شده'} title={'اخیرا مشاهده شده'} urlDest={'/my-account/my-courses'} />

          <div className='content-right__bottom'>

            <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/1.png'} />
            <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/2.png'} />
            <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/3.png'} />
            <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/4.png'} />

          </div>
        </section>

        <section className='account-page-first__content-left'>

          <div className='content-left__top'>
            <div className='content-left__header'>
              <HeaderList textLink={'همه تیکت ها'} title={'تیکت های اخیر'} urlDest={'/my-account/tickets'} />
            </div>

            <ul className='content-left__list'>
              <ItemList textEmpty={'تا به الان تیکتی ارسال نکرده‌اید!'} />
            </ul>
          </div>

          <div className='content-left__bottom'>
            <div className='content-left__header'>
              <HeaderList title={'پرسش های اخیر'} linkActive={false} />
            </div>

            <ul className='content-left__list'>
              <ItemList urlDest={'/'} textStatus={true} titleTicket={'گروه واتساپ'} date3Section={[1402, 10, 7]} />
              <ItemList urlDest={'/'} textStatus={false} titleTicket={'گروه تلگرام'} date3Section={[1402, 10, 7]} />
              <ItemList urlDest={'/'} textStatus={true} titleTicket={'گروه لینکدین برای چی این جا است'} date3Section={[1402, 10, 7]} />
              <ItemList urlDest={'/'} textStatus={false} titleTicket={'دپارتمان 133 سبزلرن کجاست'} date3Section={[1402, 10, 7]} />
            </ul>
          </div>

        </section>

      </section>

    </div>
  )
}
