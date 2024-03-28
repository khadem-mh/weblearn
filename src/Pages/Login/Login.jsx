import React from 'react'
import FormGetData from '../../Components/FormGetData/FormGetData';
//icons
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Login() {
  return (
    <section className='page-register'>
      <FormGetData
        title={"ورود با ایمیل"}
        subTitle={" حساب کاربری ندارید؟ "}
        subTitleTextLink={"ثبت نام کنید"}
        subTitleLink={"/register"}
        inputsValue={[
          { placeholder: 'آدرس ایمیل', icon: <MdOutlineAttachEmail /> },
          { placeholder: 'رمز عبور', icon: <RiLockPasswordLine /> },
        ]}
      />
    </section>
  )
}
