import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddTicket.css'
import swal from 'sweetalert'

export default function AddTicket() {

  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])
  const [departmentID, setDepartmentID] = useState(null)
  const [departmentsSubs, setDepartmentsSubs] = useState([])
  const [departmentsSubID, setDepartmentsSubID] = useState("")
  const [usersCourses, setUsersCourses] = useState([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [courseID, seCcourseID] = useState(null)

  useEffect(() => {
    fetch(`https://weblearning.liara.run/v1/tickets/departments`)
      .then(res => res.json())
      .then(datas => setDepartments(datas))
  }, [])

  useEffect(() => {
    if (departmentID && departmentID !== -1) {
      fetch(`https://weblearning.liara.run/v1/tickets/departments-subs/${departmentID}`)
        .then(res => res.json())
        .then(datas => setDepartmentsSubs(datas))
    }
  }, [departmentID])

  const isTypeHasSupport = val => {
    if (val === "63b688c5516a30a651e98156") {
      fetch(`https://weblearning.liara.run/v1/users/courses`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        }
      })
        .then(res => res.json())
        .then(datas => {
          console.log(datas);
          setUsersCourses(datas)
        })
    }
  }

  const sendNewTicket = e => {
    e.preventDefault()

    if (
      departmentID
      && departmentsSubID
      && title.length
      && body.length
    ) {

      let infosNewTicket = {
        departmentID: departmentID,
        departmentSubID: departmentsSubID,
        title: title,
        priority: '1',
        body: body,
        course: courseID ? courseID : undefined,//optional 
      }

      fetch(`https://weblearning.liara.run/v1/tickets`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(infosNewTicket)
      })
        .then(res => res.json())
        .then(datas => {
          {
            swal({
              title: 'با موفقیت تیکت ارسال شد',
              icon: 'success',
              buttons: 'باشه'
            }).then(() => {
              navigate('/my-account')
            })
          }
          console.log(datas);
        })
    }
    else {
      {
        swal({
          title: 'لطفا مقادیر خواسته شده را پر کنید',
          icon: 'warning',
          buttons: 'باشه'
        })
      }
    }
  }

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
      <select className='add-ticket__department' onChange={e => {
        setDepartmentsSubID(e.target.value)
        isTypeHasSupport(e.target.value)
      }}>
        <option value="-1">نوع تیکت را انتخاب کنید...</option>
        {
          departmentsSubs && departmentsSubs.length && departmentsSubs.map((item, index) => (
            <option value={item._id} key={index}>{item.title}</option>
          ))
        }
      </select>
      {
        departmentsSubID === '63b688c5516a30a651e98156' &&
        <>
          <p className='lable-task'>دوره مدنظر</p>
          <select className='add-ticket__department' onChange={e => seCcourseID(e.target.value)}>
            <option value="-1">دوره مدنظر را انتخاب کنید...</option>
            {
              usersCourses && usersCourses.length && usersCourses.map((item, index) => (
                <option value={item.course._id} key={index}>{item.course.name}</option>
              ))
            }
          </select>
        </>
      }

      <form className='add-ticket__form'>
        <p className='lable-task'>موضوع تیکت</p>
        <input type="text" placeholder='موضوع تیکت خود را وارد کنید' className='add-ticket__title-input' onChange={(e) => setTitle(e.target.value)} />
        <p className='lable-task'>متن تیکت</p>
        <textarea cols="30" rows="8" className='add-ticket__textarea' placeholder='متن تیکت خود را وارد کنید' onChange={(e) => setBody(e.target.value)}></textarea>
        <button onClick={(e) => sendNewTicket(e)}>ارسال</button>
      </form>

    </div>
  )
}
