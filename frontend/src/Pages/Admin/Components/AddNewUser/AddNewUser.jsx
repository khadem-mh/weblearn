import React, { useState, useEffect } from 'react'
import InputEditModal from '../InputEditModal/InputEditModal';
import { SiNamecheap } from "react-icons/si";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import swal from 'sweetalert';

export default function AddNewUser({ getAllUsers }) {

    const [inpValid, setInpValid] = useState([])
    const [isAllInpValid, setIsAllInpValid] = useState(false)
    const [btnIsActive, setBtnIsActive] = useState(false)
    const [inpFullname, setInpFullname] = useState('')
    const [inpUsername, setInpUsername] = useState('')
    const [inpEmail, setInpEmail] = useState('')
    const [inpPhone, setInpPhone] = useState('')
    const [inpPassword, setInpPassword] = useState('')

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
                name: inpFullname,
                username: inpUsername,
                email: inpEmail,
                phone: inpPhone,
                password: inpPassword,
                confirmPassword: inpPassword,
            }

            inpValid.map(item => {
                item.type === inpFullname && (newUserInfos.name = item.value)
                item.type === inpUsername && (newUserInfos.username = item.value)
                item.type === inpEmail && (newUserInfos.phone = item.value)
                item.type === inpPhone && (newUserInfos.email = item.value)
                item.type === inpPassword && (newUserInfos.password = item.value) && (newUser.confirmPassword = item.value)
                return true
            })

            fetch(`http://localhost:4000/v1/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserInfos)
            })
                .then(res => {
                    if (res.ok) return res.json()
                    else return res.text().then(err => { throw new Error(err) })
                })
                .then(() => {
                    getAllUsers()
                    setInpFullname("")
                    setInpUsername("")
                    setInpPassword("")
                    setInpPhone("")
                    setInpEmail("")
                    {
                        swal({
                            title: 'کاربر با موفقیت اضافه شد',
                            icon: 'success',
                            buttons: 'باشه'
                        })
                    }
                })
                .catch(() => {
                    {
                        swal({
                            title: 'این شماره تلفن بن شده است و شما مجاز به ثبت نام این کاربر نیستید',
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
                    <Input onValid={validRul} type={inpFullname} inpPlaceholder={'نام و نام خوانوادگی'} inpIcon={< SiNamecheap />} />
                    <Input onValid={validRul} type={inpUsername} inpPlaceholder={'نام کاربری '} inpIcon={< FaUser />} />
                    <Input onValid={validRul} type={inpEmail} inpPlaceholder={'شماره تلفن'} inpIcon={< MdAlternateEmail />} />
                    <Input onValid={validRul} type={inpPhone} inpPlaceholder={'آدرس ایمیل'} inpIcon={<FaPhoneAlt />} />
                    <Input onValid={validRul} type={inpPassword} inpPlaceholder={'رمز عبور'} inpIcon={<PiPasswordDuotone />} />
                </div>
                <button className='add-com-submit' onClick={(e) => sendNewUser(e)} disabled={btnIsActive ? false : true}>اضافه کردن کاربر</button>
            </form>
        </div>
    )

}
