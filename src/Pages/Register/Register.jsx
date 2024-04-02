import React from 'react'
import FormGetData from '../../Components/FormGetData/FormGetData';
import Input from '../../Components/Input/Input';
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
            >

                <Input inpPlaceholder={'نام و نام خوانوادگی'} inpIcon={<HiOutlineUser />} />
                <Input inpPlaceholder={'نام کاربری '} inpIcon={<HiOutlineUser />} />
                <Input inpPlaceholder={'شماره تلفن'} inpIcon={<HiOutlinePhone />} />
                <Input inpPlaceholder={'آدرس ایمیل'} inpIcon={<MdOutlineAttachEmail />} />
                <Input inpPlaceholder={'رمز عبور'} inpIcon={<RiLockPasswordLine />} />

            </FormGetData>
        </section>
    )
}
