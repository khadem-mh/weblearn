import React from 'react'
import './AddTicket.css'

export default function AddTicket() {
  return (
    <div className='container-add-ticket'>
      <h2 className='add-ticket__title'>ارسال تیکت</h2>
      <hr />
      <p className='lable-task'>دپارتمان</p>
      <select className='add-ticket__department'>
        <option value="-1">دپارتمان مورد نظر...</option>
        <option value="0">مدیریت</option>
        <option value="1">مالی</option>
        <option value="2">مشاوره</option>
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
