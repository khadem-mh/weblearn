import React from 'react'
import ItemMenuAccount from '../ItemMenuAccount/ItemMenuAccount';
//icons
import { AiOutlineHome } from "react-icons/ai";
import { VscFolderLibrary } from "react-icons/vsc";
import { GoCommentDiscussion } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";

export default function MenuAccount() {
    return (
        <ul className='account-sidbar__menu'>
            <ItemMenuAccount logo={<AiOutlineHome />} title={'پیشخوان'} mainPath={true} />
            <ItemMenuAccount logo={<VscFolderLibrary />} title={'دوره های من'} path={'my-account/my-courses'} />
            <ItemMenuAccount logo={<GoCommentDiscussion />} title={'تیکت ها'} path={'my-account/tickets'} />
            <ItemMenuAccount logo={<HiOutlineUser />} title={'جزئیات حساب'} path={'my-account/details-account'} />
            <ItemMenuAccount logo={<IoLogOutOutline />} title={'خروج'} />
        </ul>
    )
}
