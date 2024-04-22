import React from 'react'
import './MyCourses.css'
import './media.css'
//Icons
import { HiOutlineCreditCard, HiOutlineRocketLaunch, HiOutlineTicket } from "react-icons/hi2";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
//Components
import StatusBoxAccount from '../../Components/StatusBoxAccount/StatusBoxAccount'
import BoxcourseImg from '../../Components/BoxcourseImg/BoxcourseImg.jsx';
//Funcs
import faNumber from '../../../../Functions/FaNumber/FaNumber.js';

export default function MyCourses() {
  return (
    <div className='account-page-my-courses'>

      <section className='account-page-first__header'>
        <StatusBoxAccount bgColorBox={'rgba(255, 225, 0, .9)'} logo={<HiOutlineCreditCard />} title={'دوره های ثبت نام شده'} subTitle={` ${faNumber(10)} دوره`} />
        <StatusBoxAccount bgColorBox={'rgba(78, 129, 251, .9)'} logo={<HiOutlineRocketLaunch />} title={'دوره های نقدی'} subTitle={` ${faNumber(3)} دوره`} />
        <StatusBoxAccount bgColorBox={'rgba(46, 213, 115, .9)'} logo={<FaMoneyBillTrendUp />} title={'دوره های رایگان'} subTitle={`${faNumber(7)} دوره`} />
      </section>

      <div className='my-courses__parent-courses'>
        <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/1.png'} />
        <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/2.png'} />
        <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/3.png'} />
        <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/4.png'} />
        <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/5.png'} />
        <BoxcourseImg text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={'/Images/Courses/6.png'} />
      </div>

    </div>
  )
}
