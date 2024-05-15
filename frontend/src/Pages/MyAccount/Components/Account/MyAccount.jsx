import React, { useState, useEffect, useContext } from 'react'
import './MyAccount.css'
import './media.css'
//Components
import LogoHeader from '../../../../Components/LogoHeader/LogoHeader'
import MenuAccount from '../MenuAccount/MenuAccount';
//icons
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
//hook
import useModalLogic from '../../../../Hooks/useModalLogic';
import { AuthContext } from '../../../../Contexts/AuthContext';

const MyAccount = ({ children }) => {

    const [arrivewidth, setArrivewidth] = useState(false)
    const authContext = useContext(AuthContext)
    const [isShowModalNotif, clickHandlerNotif] = useModalLogic('#modalNotif')
    const [isShowModalAccount, clickHandlerAccount] = useModalLogic('#modalAccount')

    useEffect(() => {
        const resizeController = e => {
            if (e.srcElement.visualViewport.width === 1050) setArrivewidth(true)
            else setArrivewidth(false)
        }
        window.addEventListener('resize', (e) => resizeController(e))
    })

    return (
        <div className='page-account'>

            <section className={`account-sidbar ${!arrivewidth ? 'sidebar-close' : 'sidebar-open'}`}>
                <div className='d-flex align-items-center justify-content-between'>
                    {
                        arrivewidth
                            ?
                            <>
                                <LogoHeader srcLogo={'/Images/Logos/Logo-site/logo-one-copy.png'} imgW={'93px'} titleFz={'4.3rem'} subTitleFz={'1rem'} />
                                <VscChromeClose className='icon-close-menu-account' onClick={() => setArrivewidth(false)} />
                            </>
                            :
                            <LogoHeader srcLogo={'/Images/Logos/Logo-site/logo-one-copy.png'} imgW={'93px'} titleFz={'4.3rem'} subTitleFz={'1rem'} />
                    }
                </div>
                <aside className='account-sidbar__parent'>
                    <MenuAccount />
                </aside>
            </section>

            <section className={`account-content ${arrivewidth ? 'blur' : 'unblur'}`}>
                <section className='account-content__header'>

                    <div className='d-flex d-md-none menu-account-parent' onClick={() => setArrivewidth(true)}>
                        <HiOutlineMenuAlt3 className='menu-account' />
                        <p className='me-2'>جزئیات حساب</p>
                    </div>

                    <div className='d-none d-md-flex'>
                        <h2 className='account-content__title'>{authContext.userInfos.name} عزیز؛ خوش اومدی 🙌</h2>
                    </div>

                    <div className='account-content__header-left'>
                        <div className='account-content__parent-notif' onClick={e => clickHandlerNotif(e)}>
                            <IoNotificationsOutline className='account-content__notif' />
                        </div>
                        <div className='modal-account modal-notif-account' id='modalNotif'>
                            <p className='modal-notif-account__title'>اعلان ها</p>
                            <div className='modal-notif-account__bottom'>
                                {
                                    authContext.userInfos.notifications && authContext.userInfos.notifications.length
                                        ?
                                        authContext.userInfos.notifications.map(item => (
                                            <p className='modal-notif-account__announse'>{item.title}</p>
                                        ))
                                        :
                                        <p className='modal-notif-account__announse'>اعلان جدیدی وجود ندارد.</p>
                                }
                            </div>
                        </div>

                        <img src="/Images/Logos/Logo-account/logoAccount.png" alt="logo-account" className='account-content__prof' onClick={e => clickHandlerAccount(e)} />

                        <div className='modal-account modal-details-account ' id='modalAccount'>
                            <section className='header-modal-account'>
                                <div className='header-modal-account__right'>
                                    <img src="/Images/Logos/Logo-account/logoAccount.png" alt="yourImage" className='account-content__prof' />
                                </div>
                                <div className='header-modal-account__left'>
                                    <p className='header-modal-account__user-name line-clamp-2'>{authContext.userInfos.name}</p>
                                    <p className='header-modal-account__user-money-bag'>موجودی: 0 تومان</p>
                                </div>
                            </section>
                            <MenuAccount liM={'13px 0'} fzTitle={'1.3rem'} fzLogo={'1.8rem'} />
                        </div>

                    </div>
                </section>

                <section className={`account-content ${isShowModalNotif || isShowModalAccount ? 'blur' : 'unblur'}`}>
                    <div className='d-flex d-md-none'>
                        <h2 className='account-content__title'>{authContext.userInfos.name} عزیز؛ خوش اومدی 🙌</h2>
                    </div>

                    {children}
                </section>
            </section>

        </div>
    )
}

export default MyAccount