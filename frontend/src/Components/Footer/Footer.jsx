import React, { useState, useRef, useEffect, useContext } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import Input from '../Input/Input'
import { MdOutlineAttachEmail } from "react-icons/md";
import {
    inputEmail
} from "../../Validators/RulesInput.js"
import swal from 'sweetalert';
import { InfosIndexPageContext } from '../../Contexts/InfosIndexPageContext.js';

export default function Footer() {

    const infosIndex = useContext(InfosIndexPageContext)
    const btnRef = useRef()
    const [inpValid, setInpValid] = useState(null)
    const [inpClean, setInpClean] = useState(null)

    useEffect(() => {
        btnRef.current.setAttribute('disabled', true)
    }, [])

    useEffect(() => {
        if (inpValid?.valid && inpValid.valid) {
            btnRef.current.removeAttribute('disabled')
        } else {
            setInpClean(null)
            btnRef.current.setAttribute('disabled', true)
        }

    }, [inpValid])

    const sendEmailForJoinNewsLetter = event => {
        event.preventDefault()
        if (inpValid.valid) {
            fetch(`http://localhost:4000/v1/newsletters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: inpValid.value })
            })
                .then(res => {
                    if (res.ok) {
                        setInpClean("")
                        setInpValid({})
                        return res.json()
                    }
                    else return res.text().then(textErr => { throw new Error(textErr) })
                })
                .then(result => {
                    {
                        swal({
                            title: 'با موفقیت در خبرنامه عضو شدید',
                            icon: 'success',
                            buttons: 'باشه'
                        })
                    }
                })
                .catch(err => {
                    swal({
                        title: 'مشکلی در ارتباط با سرور پیش آمده',
                        icon: 'error',
                        buttons: 'تلاش دوباره'
                    })
                })
        }
    }

    const validRul = valid => setInpValid(valid)

    return (
        <section className="page footer foot">

            <header className="footer-header">
                <h4 className="footer-header__title">ضمانت وب لرن برای کلیه محصولات آموزشی</h4>
                <p className="text-light mb-4 position-relative title-main">درباره ما</p>
                <blockquote className="footer-header__text">وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی
                    که
                    در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع تصمیم
                    بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و
                    خب
                    امروز آکادمی آموزش برنامه نویسی وب لرن به عنوان یک آکادمی خصوصی فعالیت میکنه و این به این معنی
                    هست
                    که هر مدرسی اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی وب لرن رد شه! این به
                    این
                    معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی وب لرن تضمین
                    پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب سایت وب لرن حتی برای پشتیبانی دوره
                    های
                    رایگان شون هم هزینه دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته باشند
                </blockquote>
            </header>

            <footer className="footer-article">
                <div className="row row-cols-sm-2 row-cols-lg-4">

                    <div className="col-6">
                        <div className="footer-article__content">
                            <ul>
                                <li className="text-light fs-5 mb-4 position-relative title-main">دسترسی سریع</li>
                                <li className="footer-article__item"><Link to={'/all-courses/page/1'} className="footer-article__link">فروشگاه</Link>
                                </li>
                                <li className="footer-article__item"><Link to={"/contactus"} className="footer-article__link">ارتباط باما</Link></li>
                                <li><span className="footer-article__link">درباره
                                    ما</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="footer-article__content">
                            <ul>
                                <li className="text-light fs-5 mb-4 position-relative title-main">آخرین مطالب</li>
                                <li className="footer-article__item"><Link to={'/all-articles/page/1'} className="footer-article__link">مقالات</Link></li>
                                <li className="footer-article__item"><Link to={'/'} className="footer-article__link">قوانین و مقررات</Link></li>
                                <li className="footer-article__item"><Link to={'/'} className="footer-article__link footer-article__link--course"> آموزش </Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="footer-article__address mt-5 mt-lg-0">
                            <ul>
                                <li className="footer-article__item mb-4 position-relative title-main">ساعات کاری:</li>
                                <li className="footer-article__item"> <q>شنبه تا چهارشنبه 8 صبح تا 18 عصر</q> </li>
                                <li className="footer-article__item"> <q>پنج شنبه‌ها ساعت 8 صبح تا 12 ظهر </q> </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="footer-article__address mt-5 mt-lg-0">
                            <ul>
                                <li className="footer-article__item position-relative mb-4 title-main">ارتباط ما:</li>
                                <li className="footer-article__item footer-article__item-email">
                                    <address>ایمیل : {infosIndex.email}</address>
                                </li>
                                <li className="footer-article__item footer-article__item-phone">
                                    <address>شماره تماس : {infosIndex.phone}</address>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 w-100 mt-5">
                        <div className="footer-widgets__title mb-3 title-main">اشتراک در خبرنامه</div>
                        <span className="footer-widgets__text">جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک
                            شوید!</span>

                        <form className="footer-widgets__form">
                            <Input inpIcon={<MdOutlineAttachEmail />} inpPlaceholder={'ایمیل خود را وارد نمایید'} onValid={validRul} type={inputEmail} cleanInput={inpClean} />
                            <button type="submit" className="button btn-submit-letters btn-membering rounded-4" ref={btnRef} onClick={e => sendEmailForJoinNewsLetter(e)}>عضویت</button>
                        </form>
                    </div>

                </div>
            </footer>

            <footer className="footer-end">
                <small className="footer-end__text">© کلیه حقوق برای <span className="footer-end__text-title"> وب لرن </span>
                    محفوظ است 1403</small>
            </footer>

        </section>
    )
}
