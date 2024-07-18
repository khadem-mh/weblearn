import React, { useEffect, useState } from 'react'
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
import Swal from "sweetalert2"

export default function Tickets() {

  const [tickets, setTickets] = useState([])
  const [ticketsOpen, setTicketsOpen] = useState(null)
  const [ticketsClose, setTicketsClose] = useState(null)

  useEffect(() => {

    fetch(`http://localhost:4000/v1/tickets/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
      .then(res => res.json())
      .then(datas => {
        console.log(datas);
        setTickets(datas)
      })

  }, [])

  useEffect(() => {
    if (tickets.length) {
      let achieveCountTicketsOpen = (tickets.map((item, index) => {
        if (item.answer === 0) return index + 1
      })).splice(-1)

      let achieveCountTicketsClose = (tickets.map((item, index) => {
        if (item.answer === 1) return index + 1
      })).splice(-1)

      if (achieveCountTicketsOpen !== undefined) {
        setTicketsOpen(achieveCountTicketsOpen)
      }

      if (achieveCountTicketsClose !== undefined) {
        setTicketsClose(achieveCountTicketsClose)
      }
    }
  }, [tickets])

  const handleTicketShow = ticket => {
    console.log(ticket);

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
        <p class="text-center text-info">${ticket.answer === 0 ? 'هنوز پاسخی داده نشده است' : ticket.answer}</p>
      </div>
      `,
      background: '#28293D',
      color: 'whitesmoke',
      confirmButtonText: 'دیدم'
    });


  }

  return (
    <div className='account-page-my-courses'>

      <section className='statusbox-page-tickets'>
        <div className='account-page-first__header'>
          <StatusBoxAccount bgColorBox={'rgba(255, 225, 0, .9)'} logo={<HiOutlineTicket />} title={'همه تیکت ها'} subTitle={` ${tickets.length} دوره`} />
          <StatusBoxAccount bgColorBox={'rgba(78, 129, 251, .9)'} logo={< HiOutlineMailOpen />} title={'تیکت های باز'} subTitle={`${ticketsOpen && ticketsOpen[0] !== undefined ? ticketsOpen : "0"} دوره`} />
          <StatusBoxAccount bgColorBox={'rgba(46, 213, 115, .9)'} logo={<TfiComments />} title={'بسته شده'} subTitle={`${ticketsClose && ticketsClose[0] !== undefined ? ticketsClose : "0"} دوره`} />
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
          {
            tickets.map((ticket, index) => (
              <li className='li-item' style={{ cursor: 'pointer' }} key={index} onClick={() => handleTicketShow(ticket)}>
                <ItemList urlDest={'/'} textStatus={ticket.answer === 1 ? false : true} titleTicket={ticket.title} date3Section={ticket.createdAt.slice(0, 10)} statusQues={ticket.departmentID} />
              </li>
            ))
          }
        </ul>
      </div>

    </div>
  )
}
