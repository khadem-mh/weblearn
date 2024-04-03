import React from 'react'
import FormGetData from '../../Components/FormGetData/FormGetData';
import Input from '../../Components/Input/Input';
//icons
import { HiOutlineUser, HiOutlinePhone } from "react-icons/hi2";
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
//types
import {
    inputFullName, inputUserName, inputPhoneNumber, inputEmail, inputPassword
} from "../../Types/TypesInput.js"

export default function Register() {
    return (
        <section className='page-register'>
            <FormGetData
                title={"عضویت"}
                subTitle={"قبلا ثبت نام کرده اید؟ "}
                subTitleTextLink={"وارد شوید "}
                subTitleLink={"/login"}
            >

                <Input type={inputFullName} inpPlaceholder={'نام و نام خوانوادگی'} inpIcon={<HiOutlineUser />} />
                <Input type={inputUserName} inpPlaceholder={'نام کاربری '} inpIcon={<HiOutlineUser />} />
                <Input type={inputPhoneNumber} inpPlaceholder={'شماره تلفن'} inpIcon={<HiOutlinePhone />} />
                <Input type={inputEmail} inpPlaceholder={'آدرس ایمیل'} inpIcon={<MdOutlineAttachEmail />} />
                <Input type={inputPassword} inpPlaceholder={'رمز عبور'} inpIcon={<RiLockPasswordLine />} />

            </FormGetData>
        </section>
    )
}
