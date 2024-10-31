import React, { useContext, useEffect, useState } from 'react'
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
import { AuthContext } from '../../../../Contexts/AuthContext.js';
import Swal from "sweetalert2"

export default function PageFirstAccount() {

  const authContext = useContext(AuthContext)
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetch(`https://kind-tips-jam.loca.lt/v1/tickets/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
      .then(res => res.json())
      .then(datas => {
        console.log(datas);
        setTickets(datas.slice(0, 4))
      })
  }, [])

  const handleTicketShow = ticket => {
    console.log(ticket);

    fetch(`https://kind-tips-jam.loca.lt/v1/tickets/answer/${ticket._id}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      }
    })
      .then(res => res.json())
      .then(datas => {
        Swal.fire({
          icon: 'info',
          html: `
          <div style="text-align: start">
            <h2 style="font-weight: bold; color: skyblue; padding-bottom: 1rem">╩╦ تیکت ارسال شده </h2>
            <div class="border p-3 rounded-4">
              <h2 style="font-weight: bold; color: greenyellow; padding-bottom: 1rem">_موضوع تیکت</h2>
              ${ticket.title}
              <br/>
              <br/>
              <h2 style="font-weight: bold; color: greenyellow; padding-bottom: 1rem">_متن تیکت</h2>
              <p>${ticket.body}</p>
            </div>
            <br/>
            <br/>
            <h2 style="font-weight: bold; color: skyblue; padding-bottom: 1rem">╩╦ پاسخ </h2>
            <p class="text-info">${ticket.answer === 0 ? 'هنوز پاسخی داده نشده است' : datas.answer}</p>
          </div>
          `,
          background: '#28293D',
          color: 'whitesmoke',
          confirmButtonText: 'دیدم'
        });
      })


  }

  return (
    <div className='account-page-first'>

      <section className='account-page-first__header'>
        <StatusBoxAccount bgColorBox={'rgba(255, 225, 0, .9)'} logo={<HiOutlineCreditCard />} title={'مجموع پرداخت ها'} subTitle={` ${(1165500).toLocaleString()} تومان`} />
        <StatusBoxAccount bgColorBox={'rgba(78, 129, 251, .9)'} logo={<HiOutlineRocketLaunch />} title={'دوره های من'} subTitle={` ${authContext.userInfos.courses && authContext.userInfos.courses.length} دوره`} />
        <StatusBoxAccount bgColorBox={'rgba(244, 63, 94, .9)'} logo={<HiOutlineTicket />} title={'مجموع تیکت ها'} subTitle={` ${tickets.length} تیکت`} />
        <StatusBoxAccount bgColorBox={'rgba(46, 213, 115, .9)'} logo={<FaMoneyBillTrendUp />} title={'موجودی حساب'} subTitle={` 0 تومان`} />
      </section>

      <section className='account-page-first__content'>

        <section className='account-page-first__content-right'>
          <HeaderList textLink={'همه دوره های ثبت نام شده'} title={'اخیرا ثبت نام شده'} urlDest={'/my-account/my-courses'} />

          <div className='content-right__bottom'>

            {
              authContext.userInfos.courses && authContext.userInfos.courses.length && authContext.userInfos.courses.slice(0, 4).map(course => (
                <BoxcourseImg key={course._id} text={'پروژه های تخصصی با جاوا اسکریپت برای بازار کار'} imgSrc={`/Images/Courses/${course.cover}`} />
              ))
            }

          </div>
          {
            authContext.userInfos.courses && !authContext.userInfos.courses.length &&
            <p className='w-100 text-light h2 d-block text-center mt-5' style={{ fontFamily: 'Lalezar' }}>هنوز هیچ دوره ای خریداری نشده است.</p>
          }
        </section>

        <section className='account-page-first__content-left'>

          <div className='content-left__top'>
            <div className='content-left__header'>
              <HeaderList textLink={'همه تیکت ها'} title={'تیکت های اخیر'} urlDest={'/my-account/tickets'} />
            </div>

            <ul className='content-left__list'>
              {
                tickets.map((ticket, index) => (
                  <li className='li-item' style={{ cursor: 'pointer' }} key={index} onClick={() => handleTicketShow(ticket)}>
                    <ItemList urlDest={'/'} textStatus={ticket.answer === 1 ? false : true} titleTicket={ticket.title} date3Section={ticket.createdAt.slice(0, 10)} statusQues={ticket.departmentID} />
                  </li>
                ))
              }
            </ul>
          </div>
        </section>

      </section>

    </div>
  )
}
