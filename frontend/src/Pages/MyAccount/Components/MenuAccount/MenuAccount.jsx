import React, { useEffect, useState } from 'react'
import './MenuAccount.css'
import ItemMenuAccount from '../ItemMenuAccount/ItemMenuAccount';
//icons
import { AiOutlineHome } from "react-icons/ai";
import { VscFolderLibrary } from "react-icons/vsc";
import { GoCommentDiscussion } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import swal from 'sweetalert'

export default function MenuAccount({ liM, fzTitle, fzLogo }) {

    const [isShowLogout, setIsShowLogout] = useState(false)

    useEffect(() => {
        if (isShowLogout) {
            swal({
                title: 'آیا از خروج خود اطمینان دارید',
                icon: 'warning',
                buttons: ['خیر', 'بله']
            }).then(res => {
                if (res) {
                    localStorage.clear()
                    redirectToHome()
                } else setIsShowLogout(false)
            })
        }
    }, [isShowLogout])

    const redirectToHome = e => {
        e && e.preventDefault()
        if (isShowLogout) window.location.pathname = ''
    }

    return (
        <ul className='account-sidbar__menu'>
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<AiOutlineHome className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'پیشخوان'} mainPath={true} />
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<VscFolderLibrary className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'دوره های من'} path={'/my-account/my-courses'} />
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<GoCommentDiscussion className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'تیکت ها'} path={'/my-account/tickets'} />
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<HiOutlineUser className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'جزئیات حساب'} path={'/my-account/details-account'} />

            <li className='account-sidbar__li' style={{ margin: liM }}>
                <Link onClick={(e) => {
                    redirectToHome(e)
                    setIsShowLogout(true)
                }} className='account-sidbar__link'>
                    <IoLogOutOutline className='logo-menu-account' style={{ fontSize: fzLogo }} />
                    <span style={{ fontSize: fzTitle }}>خروج</span>
                </Link>
            </li>

        </ul>
    )
}