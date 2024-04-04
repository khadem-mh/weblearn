import React from 'react'
import './FormGetData.css'
import { Link } from 'react-router-dom'
import LogoHeader from '../../Components/LogoHeader/LogoHeader'

export default function FormGetData({ title, subTitle, subTitleLink, subTitleTextLink, children }) {
    console.log(children);
    return (
        <section className='register'>
            <div className='backgroundImageLogin'></div>

            <section className='container-form-registery'>
                <LogoHeader srcLogo={'./Images/Logos/Logo-site/logo-one-copy.png'} />

                <div className='form-register'>
                    <h4 className='form-register__title'>{title}</h4>
                    <p className='form-register__subtitle'> {subTitle} <Link to={subTitleLink}> {subTitleTextLink} </Link></p>
                    <form className='user-datas' autoComplete='on'>
                        {
                            children
                        }
                        <button className='btn-form-register' disabled={true}>ادامه</button>
                    </form>
                </div>

                <div className='register__footer'>
                    <strong>
                        با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمت <Link to={'/'}>سبزلرن</Link> را پذیرفته اید.
                    </strong>
                </div>

            </section>

        </section>
    )
}
