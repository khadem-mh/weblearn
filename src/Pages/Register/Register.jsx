import React, { useState, useEffect, useRef } from 'react'
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

    const formRef = useRef()
    const [inpValid, setInpValid] = useState([])

    useEffect(() => {
        console.log(inpValid);
        let formRefChildren = Array.from(formRef.current.children)
        let btnForm = formRef.current.lastElementChild

        if (inpValid.length === formRefChildren.length - 1) {
            let isInpValid = inpValid.every(inp => !inp.valid ? false : true)
            !isInpValid ? btnForm.setAttribute('disabled', true) : btnForm.removeAttribute('disabled')  
        }
    }, [inpValid])

    const validRul = valid => {
        setInpValid(state => {
            if (state.length === 0) {
                return [valid]
            } else {
                let isRepeat = state.filter(inp => inp.type !== valid.type && inp)
                if (isRepeat) {
                    return [...isRepeat, valid]
                }
            }
        })
    }

    return (
        <section className='page-register'>
            <FormGetData
                ref={formRef}
                title={"عضویت"}
                subTitle={"قبلا ثبت نام کرده اید؟ "}
                subTitleTextLink={"وارد شوید "}
                subTitleLink={"/login"}
            >

                <Input onValid={validRul} type={inputFullName} inpPlaceholder={'نام و نام خوانوادگی'} inpIcon={<HiOutlineUser />} />
                <Input onValid={validRul} type={inputUserName} inpPlaceholder={'نام کاربری '} inpIcon={<HiOutlineUser />} />
                <Input onValid={validRul} type={inputPhoneNumber} inpPlaceholder={'شماره تلفن'} inpIcon={<HiOutlinePhone />} />
                <Input onValid={validRul} type={inputEmail} inpPlaceholder={'آدرس ایمیل'} inpIcon={<MdOutlineAttachEmail />} />
                <Input onValid={validRul} type={inputPassword} inpPlaceholder={'رمز عبور'} inpIcon={<RiLockPasswordLine />} />

            </FormGetData>
        </section>
    )
}
