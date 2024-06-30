import React, { useState, useEffect } from 'react'
import Input from '../../../../Components/Input/Input';
import { SiNamecheap } from "react-icons/si";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import swal from 'sweetalert';
//types
import {
    inputFullName, inputUserName, inputPhoneNumber, inputEmail, inputPassword
} from "../../../../Validators/RulesInput.js"

export default function AddNewUser({ getAllUsers }) {

    const [inpValid, setInpValid] = useState([])
    const [isAllInpValid, setIsAllInpValid] = useState(false)
    const [btnIsActive, setBtnIsActive] = useState(false)

    useEffect(() => {
        if (inpValid.length === 5) {

            let isInpValid = inpValid.every(inp => !inp.valid ? false : true)

            if (!isInpValid) {
                setBtnIsActive(false)
                setIsAllInpValid(false)
            } else {
                setBtnIsActive(true)
                setIsAllInpValid(true)
            }
        }
    }, [inpValid])

    const sendNewUser = e => {
        e.preventDefault()

        if (isAllInpValid) {

            setBtnIsActive(true)

            const newUserInfos = {
                name: null,
                username: null,
                email: null,
                phone: null,
                password: null,
                confirmPassword: null,
            }

            inpValid.map(item => {
                item.type === inputFullName && (newUserInfos.name = item.value)
                item.type === inputUserName && (newUserInfos.username = item.value)
                item.type === inputEmail && (newUserInfos.email = item.value)
                item.type === inputPhoneNumber && (newUserInfos.phone = item.value)
                item.type === inputPassword && (newUserInfos.password = item.value) && (newUserInfos.confirmPassword = item.value)
                return true
            })
            console.log("user infos => ", newUserInfos);
            fetch(`http://localhost:4000/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserInfos)
            })
                .then(res => res.json())
                .then(() => {
                    getAllUsers()
                    {
                        swal({
                            title: 'کاربر با موفقیت اضافه شد',
                            icon: 'success',
                            buttons: 'باشه'
                        })
                    }
                })
                .catch(err => {
                    {
                        swal({
                            title: 'خطایی در سمت سرور پیش امده یا شماره تلفن کاربر بن هست',
                            icon: 'error',
                            buttons: 'باشه'
                        })
                    }
                })

        }

    }

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
        <div className='com-main'>
            <h1 className='com-title'>افزودن کاریر جدید</h1>

            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <Input onValid={validRul} type={inputFullName} inpPlaceholder={'نام و نام خوانوادگی'} inpIcon={< SiNamecheap />} />
                    <Input onValid={validRul} type={inputUserName} inpPlaceholder={'نام کاربری '} inpIcon={< FaUser />} />
                    <Input onValid={validRul} type={inputPhoneNumber} inpPlaceholder={'شماره تلفن'} inpIcon={<FaPhoneAlt />} />
                    <Input onValid={validRul} type={inputEmail} inpPlaceholder={'آدرس ایمیل'} inpIcon={< MdAlternateEmail />} />
                    <Input onValid={validRul} type={inputPassword} inpPlaceholder={'رمز عبور'} inpIcon={<PiPasswordDuotone />} />
                </div>
                <button className='add-com-submit' onClick={(e) => sendNewUser(e)} disabled={btnIsActive ? false : true}>اضافه کردن کاربر</button>
            </form>
        </div>
    )

}
