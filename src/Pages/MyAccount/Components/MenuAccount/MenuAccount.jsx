import React from 'react'
import './MenuAccount.css'
import ItemMenuAccount from '../ItemMenuAccount/ItemMenuAccount';
//icons
import { AiOutlineHome } from "react-icons/ai";
import { VscFolderLibrary } from "react-icons/vsc";
import { GoCommentDiscussion } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";

export default function MenuAccount({ liM, fzTitle, fzLogo }) {
    return (
        <ul className='account-sidbar__menu'>
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<AiOutlineHome className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'پیشخوان'} mainPath={true} />
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<VscFolderLibrary className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'دوره های من'} path={'/my-account/my-courses'} />
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<GoCommentDiscussion className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'تیکت ها'} path={'/my-account/tickets'} />
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<HiOutlineUser className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'جزئیات حساب'} path={'/my-account/details-account'} />
            <ItemMenuAccount fzTitle={fzTitle} liMargin={liM} logo={<IoLogOutOutline className='logo-menu-account' style={{ fontSize: fzLogo }} />} title={'خروج'} path={'/'}/>
        </ul>
    )
}