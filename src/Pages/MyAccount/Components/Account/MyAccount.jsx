import React from 'react'
import './MyAccount.css'
//Components
import LogoHeader from '../../../../Components/LogoHeader/LogoHeader'
import MenuAccount from '../MenuAccount/MenuAccount';
//icons
import { IoNotificationsOutline } from "react-icons/io5";
//hook
import useModalLogic from '../../../../Hooks/useModalLogic';

const MyAccount = ({ children }) => {

    const clickHandlerNotif = useModalLogic('#modalNotif')
    const clickHandlerAccount = useModalLogic('#modalAccount')

    return (
        <div className='page-account'>

            <section className='account-sidbar'>
                <LogoHeader srcLogo={'/Images/Logos/Logo-site/logo-one-copy.png'} imgW={'93px'} titleFz={'4.3rem'} subTitleFz={'1rem'} />
                <aside className='account-sidbar__parent'>
                    <MenuAccount />
                </aside>
            </section>

            <section className='account-content'>
                <section className='account-content__header'>
                    <div>
                        <h2 className='account-content__title'>محمدحسین عزیز؛ خوش اومدی 🙌</h2>
                    </div>
                    <div className='account-content__header-left'>
                        <div className='account-content__parent-notif' onClick={e => clickHandlerNotif(e)}>
                            <IoNotificationsOutline className='account-content__notif' />
                        </div>
                        <div className='modal-account modal-notif-account' id='modalNotif'>
                            <p className='modal-notif-account__title'>اعلان ها</p>
                            <div className='modal-notif-account__bottom'>
                                <p className='modal-notif-account__announse'>اعلان جدیدی وجود ندارد.</p>
                            </div>
                        </div>
                        <img src="/Images/Logos/Logo-account/logoAccount.png" alt="logo-account" className='account-content__prof' onClick={e => clickHandlerAccount(e)} />

                        <div className='modal-account modal-details-account ' id='modalAccount'>
                            <MenuAccount />
                        </div>

                    </div>
                </section>
                <section>
                    {children}
                </section>
            </section>

        </div>
    )
}

export default MyAccount