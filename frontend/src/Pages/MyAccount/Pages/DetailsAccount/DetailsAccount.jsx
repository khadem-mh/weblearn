import React from 'react'
import './DetailsAccount.css'
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

export default function DetailsAccount() {
  return (
    <section className='details-account'>

      <section className='details-account__right-box'>

        <h2>جزئیات حساب کاربری</h2>
        <hr />

        <section className='details-account__parent'>
          <div className='right-box__right'>

            <div className='right-box__right-prof'>
              <img src="/Images/Logos/Logo-account/logoAccount.png" alt="yourImage" className='account-content__prof prof-details-account' />
              <div className='right-box__right-prof-parent-icon'>
                <VscGitPullRequestGoToChanges className='right-box__right-prof-icon' />
              </div>
            </div>

            <p className='lable-task'>شماره موبایل</p>
            <input type="text" className='input-details-account' />
            <p className='lable-task'>نام</p>
            <input type="text" className='input-details-account' />
            <p className='lable-task'>نام کاربری</p>
            <input type="text" className='input-details-account' />

          </div>

          <div className='right-box__left'>
            <p className='lable-task'>نام خوانوادگی</p>
            <input type="text" className='input-details-account' />
            <p className='lable-task'>ایمیل</p>
            <input type="text" className='input-details-account' />
          </div>
        </section>

        <div className='btn-details-account-parent'>
          <button className='btn-details-account'>ثبت اطلاعات</button>
        </div>

      </section>

      <section className='details-account__left'>
        <h2>تغیر رمز عبور</h2>
        <hr />
        <p className='lable-task'>رمز عبور فعلی</p>
        <input type="text" placeholder='رمز فعلی را وارد کنید' className='input-details-account' />
        <p className='forget-password-details-account'>رمز عبور را فراموش کرده اید؟</p>
        <p className='lable-task'>رمز عبور جدید</p>
        <input type="text" placeholder='رمز جدید را وارد کنید' className='input-details-account' />
        <div className='btn-details-account-parent'>
          <button className='btn-details-account'>تغیر رمز</button>
        </div>
      </section>

    </section>
  )
}
