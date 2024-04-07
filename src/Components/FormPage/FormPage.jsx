import React, { useState, useEffect, useRef } from 'react'
import FormGetData from '../FormGetData/FormGetData.jsx';
import Input from '../Input/Input.jsx';
//icons
import { HiOutlineUser, HiOutlinePhone } from "react-icons/hi2";
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
//types
import {
    inputFullName, inputUserName, inputPhoneNumber, inputEmail, inputPassword
} from "../../Validators/RulesInput.js"

export default function FormPage({ nameFormPage }) {

    const formRef = useRef()
    const [inpValid, setInpValid] = useState([])

    useEffect(() => {
        let btnForm = formRef.current.lastElementChild

        if (inpValid.length === formRef.current.children.length - 1) {
            let isInpValid = inpValid.every(inp => !inp.valid ? false : true)
            !isInpValid ? btnForm.setAttribute('disabled', true) : btnForm.removeAttribute('disabled')
        }
    }, [inpValid])

    const validRul = valid => {
        setInpValid(state => {
            if (state.length === 0) return [valid]
            else {
                let isRepeat = state.filter(inp => inp.type !== valid.type && inp)
                if (isRepeat) return [...isRepeat, valid]
            }
        })
    }

    return (
        <FormGetData
            ref={formRef}
            title={nameFormPage === 'register' ? "عضویت" : "ورود با ایمیل"}
            subTitle={nameFormPage === 'register' ? "قبلا ثبت نام کرده اید؟ " : " حساب کاربری ندارید؟ "}
            subTitleTextLink={nameFormPage === 'register' ? "وارد شوید " : "ثبت نام کنید"}
            subTitleLink={nameFormPage === 'register' ? "/login" : "/register"}
        >
            {
                nameFormPage === 'register'
                    ?
                    <>
                        <Input onValid={validRul} type={inputFullName} inpPlaceholder={'نام و نام خوانوادگی'} inpIcon={<HiOutlineUser />} />
                        <Input onValid={validRul} type={inputUserName} inpPlaceholder={'نام کاربری '} inpIcon={<HiOutlineUser />} />
                        <Input onValid={validRul} type={inputPhoneNumber} inpPlaceholder={'شماره تلفن'} inpIcon={<HiOutlinePhone />} />
                        <Input onValid={validRul} type={inputEmail} inpPlaceholder={'آدرس ایمیل'} inpIcon={<MdOutlineAttachEmail />} />
                        <Input onValid={validRul} type={inputPassword} inpPlaceholder={'رمز عبور'} inpIcon={<RiLockPasswordLine />} />
                    </>
                    :
                    <>
                        <Input onValid={validRul} type={inputEmail} inpPlaceholder={'آدرس ایمیل'} inpIcon={<MdOutlineAttachEmail />} />
                        <Input onValid={validRul} type={inputPassword} inpPlaceholder={'رمز عبور'} inpIcon={<RiLockPasswordLine />} />
                    </>
            }
        </FormGetData>
    )
}
