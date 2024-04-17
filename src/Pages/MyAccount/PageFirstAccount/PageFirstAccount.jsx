import React from 'react'
import StatusBoxAccount from '../Components/StatusBoxAccount/StatusBoxAccount'
//icons
import { HiOutlineCreditCard, HiOutlineRocketLaunch, HiOutlineTicket  } from "react-icons/hi2";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

//Funcs
import faNumber from '../../../Functions/FaNumber/FaNumber';

export default function PageFirstAccount() {
  return (
    <div>
      <StatusBoxAccount bgColorBox={'#FACC15'} logo={<HiOutlineCreditCard />} title={'مجموع پرداخت ها'} subTitle={` ${faNumber(1165500)} تومان`} />
      <StatusBoxAccount bgColorBox={'#4E81FB'} logo={<HiOutlineRocketLaunch />} title={'دوره های من'} subTitle={` ${faNumber(10)} دوره`} />
      <StatusBoxAccount bgColorBox={'#F43F5E'} logo={<HiOutlineTicket  />} title={'مجموع تیکت ها'} subTitle={` ${faNumber(3)} تیکت`} />
      <StatusBoxAccount bgColorBox={'#2ED573'} logo={<FaMoneyBillTrendUp />} title={'موجودی حساب'} subTitle={` 0 تومان`} />
    </div>
  )
}
