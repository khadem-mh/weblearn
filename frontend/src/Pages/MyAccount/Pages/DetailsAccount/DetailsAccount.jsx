import React, { useContext, useState, useEffect } from 'react'
import './DetailsAccount.css'
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { AuthContext } from '../../../../Contexts/AuthContext';
import { validateEmail, validatePhone } from '../../../../Validators/Regex';
import swal from 'sweetalert';

export default function DetailsAccount() {

  const authContext = useContext(AuthContext)
  const { name, username, email, phone } = authContext.userInfos
  const [nameInp, setNameInp] = useState("")
  const [userNameInp, setUserNameInp] = useState("")
  const [emailInp, setEmailInp] = useState("")
  const [passwordInp, setPasswordInp] = useState("")
  const [phoneInp, setPhoneInp] = useState("")

  useEffect(() => {

    if (email) {

      setNameInp(name)
      setUserNameInp(username)
      setEmailInp(email)
      setPhoneInp(phone)

    }

  }, [authContext])

  const updateInfosAccountUser = () => {

    if (
      nameInp === name
      && userNameInp === username
      && emailInp === email
      && phoneInp === phone
    ) {

      swal({
        title: 'شما مقداری را بروز رسانی نکرده اید',
        icon: 'warning',
        buttons: 'باشه'
      })

    }

    else if (
      nameInp.length
      && userNameInp.length
      && phoneInp.length
      && emailInp.length
      && validateEmail(emailInp)
      && validatePhone(phoneInp)
    ) {

      swal({
        title: 'اطلاعات حساب شما با موفقیت بروز شد',
        icon: 'success',
        buttons: 'باشه'
      })

    }

    else {

      swal({
        title: 'مقادیر وارد شده اشتباه یا ناقص است',
        icon: 'warning',
        buttons: 'باشه'
      })

    }

  }

  return (
    <section className='details-account'>

      <section className='details-account__right-box'>

        <h2>جزئیات حساب کاربری</h2>
        <hr />

        <section className='details-account__parent py-4'>
          <div className='right-box__right'>

            <div className='right-box__right-prof'>
              <img src="/Images/Logos/Logo-account/logoAccount.png" alt="yourImage" className='account-content__prof prof-details-account' />
              <div className='right-box__right-prof-parent-icon'>
                <VscGitPullRequestGoToChanges className='right-box__right-prof-icon' />
              </div>
            </div>

            <p className='lable-task'>شماره موبایل</p>
            <input type="text" className='input-details-account' value={phoneInp} onChange={e => setPhoneInp(e.target.value)} />
            <p className='lable-task'>نام</p>
            <input type="text" className='input-details-account' value={nameInp} onChange={e => setNameInp(e.target.value)} />
            <p className='lable-task'>نام کاربری</p>
            <input type="text" className='input-details-account' value={userNameInp} onChange={e => setUserNameInp(e.target.value)} />

          </div>

          <div className='right-box__left'>
            <p className='lable-task'>تاریخ ثبت نام</p>
            <input type="text" className='input-details-account' defaultValue={authContext.userInfos.createdAt && authContext.userInfos.createdAt.slice(0, 10)} readOnly />
            <p className='lable-task'>ایمیل</p>
            <input type="text" className='input-details-account' value={emailInp} onChange={e => setEmailInp(e.target.value)} />
          </div>
        </section>



      </section>

      <section className='details-account__left'>
        <h2>تغیر رمز عبور</h2>
        <hr />
        <p className='lable-task'>رمز عبور فعلی</p>
        <input type="text" placeholder='رمز فعلی را وارد کنید' className='input-details-account' />
        <p className='forget-password-details-account'>رمز عبور را فراموش کرده اید؟</p>
        <p className='lable-task'>رمز عبور جدید</p>
        <input type="text" placeholder='رمز جدید را وارد کنید' className='input-details-account' value={passwordInp} onChange={e => setPasswordInp(e.target.value)} />
        <br />
      </section>
      <div className='btn-details-account-parent'>
        <button className='btn-details-account' onClick={updateInfosAccountUser}>بروزرسانی اطلاعات</button>
      </div>
    </section>
  )
}
