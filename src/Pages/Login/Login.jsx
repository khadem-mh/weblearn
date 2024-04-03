import React from 'react'
import FormGetData from '../../Components/FormGetData/FormGetData';
import Input from '../../Components/Input/Input';
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
      >
        <Input inpPlaceholder={'آدرس ایمیل'} inpIcon={<MdOutlineAttachEmail />} />
        <Input inpPlaceholder={'رمز عبور'} inpIcon={<RiLockPasswordLine />} />
      </FormGetData>
    </section>
  )
}
