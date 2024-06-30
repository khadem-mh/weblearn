import React, { useState, useEffect } from 'react'
import InputEditModal from '../InputEditModal/InputEditModal';
import { SiNamecheap } from "react-icons/si";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";

export default function AddNewUser({ getAllUsers }) {

    const [btnIsActive, setBtnIsActive] = useState(false)
    const [inpFullname, setInpFullname] = useState('')
    const [inpUsername, setInpUsername] = useState('')
    const [inpEmail, setInpEmail] = useState('')
    const [inpPhone, setInpPhone] = useState('')
    const [inpPassword, setInpPassword] = useState('')

    const sendNewUser = e => {
        e.preventDefault()

        const newUserInfos = {
            name: inpFullname,
            username: inpUsername,
            email: inpEmail,
            phone: inpPhone,
            password: inpPassword,
            confirmPassword: inpPassword,
        }

        fetch(`http://localhost:4000/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfos)
        })
            .then(res => res.json())
            .then(() => {
                getAllUsers()
                setInpFullname("")
                setInpUsername("")
                setInpPassword("")
                setInpPhone("")
                setInpEmail("")
            })

    }

    return (
        <div className='com-main'>
            <h1 className='com-title'>افزودن کاریر جدید</h1>

            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <InputEditModal valInp={inpFullname} setValInp={setInpFullname} cildren={< SiNamecheap />} placeHolderInp='نام و نام خوانوادگی' />
                    <InputEditModal valInp={inpUsername} setValInp={setInpUsername} cildren={< FaUser />} placeHolderInp='نام کاربری' />
                    <InputEditModal valInp={inpEmail} setValInp={setInpEmail} cildren={< MdAlternateEmail />} placeHolderInp='ایمیل' />
                    <InputEditModal valInp={inpPhone} setValInp={setInpPhone} cildren={<FaPhoneAlt />} placeHolderInp='شماره تلفن' />
                    <InputEditModal valInp={inpPassword} setValInp={setInpPassword} cildren={< PiPasswordDuotone />} placeHolderInp='رمز عبور' />
                </div>
                <button className='add-com-submit' onClick={(e) => sendNewUser(e)} disabled={btnIsActive ? false : true}>اضافه کردن کاربر</button>
            </form>
        </div>
    )

}
