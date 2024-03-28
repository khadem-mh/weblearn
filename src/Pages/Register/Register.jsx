import React from 'react'
import FormGetData from '../../Components/FormGetData/FormGetData';
//icons
import { HiOutlineUser, HiOutlinePhone } from "react-icons/hi2";
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Register() {
    return (
        <section className='page-register'>
            <FormGetData
                title={"عضویت"}
                subTitle={"قبلا ثبت نام کرده اید؟ "}
                subTitleTextLink={"وارد شوید "}
                subTitleLink={"/login"}
                inputsValue={[
                    { placeholder: 'نام و نام خوانوادگی', icon: <HiOutlineUser /> },
                    { placeholder: 'نام کاربری ', icon: <HiOutlineUser /> },
                    { placeholder: 'شماره تلفن', icon: <HiOutlinePhone /> },
                    { placeholder: 'آدرس ایمیل', icon: <MdOutlineAttachEmail /> },
                    { placeholder: 'رمز عبور', icon: <RiLockPasswordLine /> },
                ]}
            />
        </section>
    )
}
