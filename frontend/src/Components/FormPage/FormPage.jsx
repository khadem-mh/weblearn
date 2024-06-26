import React, { useState, useEffect, useRef, useContext } from 'react'
import './FormPage.css'
import { useNavigate } from 'react-router-dom'
import FormGetData from '../FormGetData/FormGetData.jsx';
import Input from '../Input/Input.jsx';
import ReCAPTCHA from "react-google-recaptcha";
//icons
import { HiOutlineUser, HiOutlinePhone } from "react-icons/hi2";
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
//types
import {
    inputFullName, inputUserName, inputPhoneNumber, inputEmail, inputPassword, textArea
} from "../../Validators/RulesInput.js"
import { AuthContext } from '../../Contexts/AuthContext.js'
//package
import swal from 'sweetalert'

export default function FormPage({ nameFormPage }) {

    const navigate = useNavigate()
    const formRef = useRef()
    const [inpValid, setInpValid] = useState([])
    const [recaptchaOk, setRecaptchaOk] = useState(false)
    const authContext = useContext(AuthContext)

    useEffect(() => {
        let btnForm = formRef.current.lastElementChild

        !recaptchaOk && btnForm.setAttribute('disabled', true)

        if (window.location.pathname.includes('login') && inpValid.length === formRef.current.children.length - 2 && recaptchaOk ||
            window.location.pathname.includes('register') && inpValid.length === formRef.current.children.length - 1 ||
            window.location.pathname.includes('contact') && inpValid.length === formRef.current.children.length - 1) {

            let isInpValid = inpValid.every(inp => !inp.valid ? false : true)

            if (!isInpValid) {
                btnForm.setAttribute('disabled', true)
            } else {
                btnForm.removeAttribute('disabled')

                btnForm.addEventListener('click', e => {
                    e.preventDefault()

                    if (nameFormPage === 'register') {

                        const newUser = {
                            username: null,
                            email: null,
                            password: null,
                            confirmPassword: null,
                            name: null,
                            phone: null,
                        }

                        inpValid.map(item => {
                            item.type === inputFullName && (newUser.name = item.value)
                            item.type === inputUserName && (newUser.username = item.value)
                            item.type === inputPhoneNumber && (newUser.phone = item.value)
                            item.type === inputEmail && (newUser.email = item.value)
                            item.type === inputPassword && (newUser.password = item.value) && (newUser.confirmPassword = item.value)
                            return true
                        })

                        fetch(`http://localhost:4000/v1/auth/register`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => {
                                if (res.ok) return res.json()
                                else return res.text().then(err => { throw new Error(err) })
                            })
                            .then(result => {
                                {
                                    swal({
                                        title: 'با موفقیت ثبت نام شدید',
                                        icon: 'success',
                                        buttons: 'ورود به پنل'
                                    })
                                }
                                authContext.login(result.user, result.accessToken)
                                window.location = '/my-account'
                            })
                            .catch(err => {
                                {
                                    swal({
                                        title: 'این شماره تلفن بن شده است و شما مجاز به ثبت نام نیستید',
                                        icon: 'error',
                                        buttons: 'باشه'
                                    })
                                }
                            })

                    }
                    else if (nameFormPage === 'login') {

                        const loginUser = {
                            identifier: null,
                            password: null
                        }

                        inpValid.map(item => {
                            item.type === inputEmail && (loginUser.identifier = item.value)
                            item.type === inputPassword && (loginUser.password = item.value)
                            return true
                        })

                        fetch(`http://localhost:4000/v1/auth/login`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(loginUser)
                        })
                            .then(res => {
                                if (res.ok) return res.json()
                                else return res.text().then(textErr => { throw new Error(textErr) })
                            })
                            .then(result => {
                                {
                                    swal({
                                        title: 'با موفقیت وارد شدید',
                                        icon: 'success',
                                        buttons: 'ورود به پنل'
                                    }).then(val => navigate(authContext.userInfos?.role && authContext.userInfos.role === 'ADMIN' ? '/my-account' : '/p-admin'))
                                }
                                authContext.login(result.user, result.accessToken)
                            })
                            .catch(err => {
                                swal({
                                    title: 'همچین کاربری وجود ندارد',
                                    icon: 'error',
                                    buttons: 'تلاش دوباره'
                                })
                            })
                    } else {

                        const criticismUser = {
                            name: null,
                            email: null,
                            phone: null,
                            body: null,
                        }

                        inpValid.map(item => {
                            item.type === inputFullName && (criticismUser.name = item.value)
                            item.type === inputEmail && (criticismUser.email = item.value)
                            item.type === inputPhoneNumber && (criticismUser.phone = item.value)
                            item.type === textArea && (criticismUser.body = item.value)
                            return true
                        })

                        fetch(`http://localhost:4000/v1/contact`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(criticismUser)
                        })
                            .then(res => {
                                if (res.ok) return res.json()
                                else return res.text().then(textErr => { throw new Error(textErr) })
                            })
                            .then(result => {
                                {
                                    swal({
                                        title: 'با موفقیت نظرتون ارسال شد',
                                        icon: 'success',
                                        buttons: 'باشه'
                                    }).then(val => navigate('/'))
                                }
                            })
                            .catch(err => {
                                swal({
                                    title: 'مشکلی در ارتباط با سروز پیش آمد',
                                    icon: 'error',
                                    buttons: 'تلاش دوباره'
                                })
                            })
                    }

                })
            }
        }
    }, [inpValid, recaptchaOk, authContext])

    const validRul = valid => {
        setInpValid(state => {
            if (state.length === 0) return [valid]
            else {
                let isRepeat = state.filter(inp => inp.type !== valid.type && inp)
                if (isRepeat) return [...isRepeat, valid]
            }
        })
    }

    const onChangeHandler = () => setRecaptchaOk(prev => !prev)

    return (
        <FormGetData
            ref={formRef}
            title={nameFormPage === 'register' ? "عضویت" : nameFormPage === 'login' ? "ورود با ایمیل" : nameFormPage === 'contactus' && 'ارتباط با ما'}
            subTitle={nameFormPage === 'register' ? "قبلا ثبت نام کرده اید؟ " : nameFormPage === 'login' ? " حساب کاربری ندارید؟ " : nameFormPage === 'contactus' && 'نظر یا انتقادتو برامون بنویس :)'}
            subTitleTextLink={nameFormPage === 'register' ? "وارد شوید " : nameFormPage === 'login' ? "ثبت نام کنید" : nameFormPage === 'contactus' && ''}
            subTitleLink={nameFormPage === 'register' ? "/login" : nameFormPage === 'login' ? "/register" : nameFormPage === 'contactus' && ''}
            footer={nameFormPage === 'contactus' ? false : true}
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
                    : nameFormPage === 'login' ?
                        <>
                            <Input onValid={validRul} type={inputEmail} inpPlaceholder={'آدرس ایمیل'} inpIcon={<MdOutlineAttachEmail />} />
                            <Input onValid={validRul} type={inputPassword} inpPlaceholder={'رمز عبور'} inpIcon={<RiLockPasswordLine />} />
                            <div className='parent-recaptcha'>
                                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChangeHandler} theme="dark" />
                            </div>
                        </>
                        : nameFormPage === 'contactus' &&
                        <>
                            <Input onValid={validRul} type={inputFullName} inpPlaceholder={'نام و نام خوانوادگی'} inpIcon={<HiOutlineUser />} />
                            <Input onValid={validRul} type={inputEmail} inpPlaceholder={'آدرس ایمیل'} inpIcon={<MdOutlineAttachEmail />} />
                            <Input onValid={validRul} type={inputPhoneNumber} inpPlaceholder={'شماره تلفن'} inpIcon={<HiOutlinePhone />} />
                            <Input onValid={validRul} type={textArea} inpPlaceholder={'متن خود را وارد کنید'} textarea={true} />
                        </>

            }
        </FormGetData>
    )
}
