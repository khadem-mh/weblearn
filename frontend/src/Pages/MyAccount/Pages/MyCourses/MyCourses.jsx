import React, { useContext } from 'react'
import './MyCourses.css'
import './media.css'
//Icons
import { HiOutlineCreditCard, HiOutlineRocketLaunch } from "react-icons/hi2";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
//Components
import StatusBoxAccount from '../../Components/StatusBoxAccount/StatusBoxAccount'
import BoxcourseImg from '../../Components/BoxcourseImg/BoxcourseImg.jsx';
//
import { AuthContext } from '../../../../Contexts/AuthContext.js';

export default function MyCourses() {

  const authContext = useContext(AuthContext)

  return (
    <div className='account-page-my-courses'>

      <section className='account-page-first__header'>
        <StatusBoxAccount bgColorBox={'rgba(255, 225, 0, .9)'} logo={<HiOutlineCreditCard />} title={'دوره های ثبت نام شده'} subTitle={` ${authContext.userInfos.courses && authContext.userInfos.courses.length} دوره`} />
        <StatusBoxAccount bgColorBox={'rgba(78, 129, 251, .9)'} logo={< FaMoneyBillTrendUp />} title={'دوره های نقدی'} subTitle={` ${authContext.userInfos && authContext.userInfos.lenght ? authContext.userInfos.courses.map(course => course.price !== 0).length : '0'} دوره`} />
        <StatusBoxAccount bgColorBox={'rgba(46, 213, 115, .9)'} logo={<HiOutlineRocketLaunch />} title={'دوره های رایگان'} subTitle={`${authContext.userInfos.courses && authContext.userInfos.lenght ? authContext.userInfos.courses.map(course => course.price === 0).length : '0'} دوره`} />
      </section>

      <div className='my-courses__parent-courses w-100'>
        {
          authContext.userInfos.courses && authContext.userInfos.courses.length
          &&
          authContext.userInfos.courses.map(course => (
            <BoxcourseImg key={course.id} text={course.name} imgSrc={`/Images/Courses/${course.cover}`} />
          ))
        }
      </div>

      {
        authContext.userInfos.courses && !authContext.userInfos.courses.length &&
        <p className='text-light h1 d-block text-center mt-5' style={{ fontFamily: 'Lalezar' }}>هنوز هیچ دوره ای خریداری نشده است.</p>
      }

    </div>
  )
}
