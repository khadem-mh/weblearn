import React, { useEffect, useState } from 'react'
//import { Navigate } from 'react-router-dom'
import './AddTicket.css'
//import swal from 'sweetalert'

export default function AddTicket() {

  const [departments, setDepartments] = useState([])
  const [departmentID, setDepartmentID] = useState(null)
  const [departmentsSubs, setDepartmentsSubs] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/departments`)
      .then(res => res.json())
      .then(datas => setDepartments(datas))
  }, [])

  useEffect(() => {
    if (departmentID && departmentID !== -1) {
      fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
        .then(res => res.json())
        .then(datas => setDepartmentsSubs(datas))
    }
  }, [departmentID])

  return (
    <div className='container-add-ticket'>
      <h2 className='add-ticket__title'>ارسال تیکت</h2>
      <hr />
      <p className='lable-task'>دپارتمان</p>
      <select className='add-ticket__department' onChange={e => setDepartmentID(e.target.value)}>
        <option value="-1">دپارتمان مورد نظر...</option>
        {
          departments && departments.length && departments.map(({ title, _id }, index) => (
            <option value={_id} key={index}>{title}</option>
          ))
        }
      </select>

      <p className='lable-task'>نوع تیکت</p>
      <select className='add-ticket__department'>
        <option value="-1">نوع تیکت را انتخاب کنید...</option>
        {
          departmentsSubs && departmentsSubs.length && departmentsSubs.map(({ title, _id }, index) => (
            <option value={_id} key={index}>{title}</option>
          ))
        }
      </select>

      <form className='add-ticket__form'>
        <p className='lable-task'>موضوع تیکت</p>
        <input type="text" placeholder='موضوع تیکت خود را وارد کنید' className='add-ticket__title-input' />
        <p className='lable-task'>متن تیکت</p>
        <textarea cols="30" rows="8" className='add-ticket__textarea' placeholder='متن تیکت خود را وارد کنید'></textarea>
        <button>ارسال</button>
      </form>

    </div>
  )
}
