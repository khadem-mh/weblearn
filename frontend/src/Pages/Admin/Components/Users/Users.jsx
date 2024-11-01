import React, { useState } from 'react'
import './Users.css'
import ErrorBoxEmpty from '../ErrorBoxEmpty/ErrorBoxEmpty'
import DeleteModal from '../Modals/DeleteModal/DeleteModal'
import EditMoal from '../Modals/EditMoal/EditMoal'
import InputEditModal from '../InputEditModal/InputEditModal'
import { SiNamecheap } from "react-icons/si";
import { SlBasketLoaded } from "react-icons/sl";
import { FaUser, FaCity } from "react-icons/fa";
import { PiPasswordDuotone, PiAddressBookLight } from "react-icons/pi";
import { MdOutlinePhoneIphone, MdAlternateEmail, MdOutlineScoreboard } from "react-icons/md";
import swal from 'sweetalert'

export default function Users({ allUsers, getAllUsers }) {

  const [userId, setUserId] = useState(null)
  const [isShowDeleteUser, setIsShowDeleteUser] = useState(false)
  //update state
  const [isShowbanUser, setIsShowBanUser] = useState(false)

  const submitDeleteUser = () => {
    fetch(`http://localhost:4000/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
      .then(res => {
        if (res.ok) {
          {
            swal({
              title: 'با موفقیت کاربر حذف شد',
              icon: 'success',
              buttons: 'باشه'
            })
          }
          setIsShowDeleteUser(false)
          getAllUsers()
        }
      })
  }

  const submitBanUser = () => {
    fetch(`http://localhost:4000/v1/users/ban/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    }).then(res => res.ok && setIsShowBanUser(false))

    fetch(`http://localhost:4000/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
      .then(res => {
        if (res.ok) {
          {
            swal({
              title: 'با موفقیت کاربر بن و به صورت خودکار حذف شد',
              icon: 'success',
              buttons: 'باشه'
            })
          }
          getAllUsers()
        }
      })
  }

  const changeRole = (userID) => {

    swal({
      title: "لطفا نقش جدید را وارد نمایید:",
      content: 'input',
      buttons: 'تایید'
    }).then(value => {
      if (value && value.length) {
        const reqBodyInfos = {
          role: value,
          id: userID
        }

        fetch(`http://localhost:4000/v1/users/role`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBodyInfos)
        }).then(res => {
          if (res.ok) {
            getAllUsers()
            swal({
              title: "نقش کاربر مورد نظر با موفقیت تغییر یافت",
              icon: "success",
              buttons: "خیلی هم عالی"
            })
          }
        })
      }
    })


  }

  const setDelete = remove => remove(false)

  return (
    <>
      <div>
        {allUsers.length ?
          (
            <>
              <h1 className='products-title'>کاربران</h1>
              <div className='parent-table table-users'>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">شناسه</th>
                      <th scope="col">نام و نام خوانوادگی</th>
                      <th scope="col">نام کاربری</th>
                      <th scope="col">شماره تماس</th>
                      <th scope="col">ایمیل</th>
                      <th scope="col">تغیر نقش</th>
                      <th scope="col">حذف</th>
                      <th scope="col">بن</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      allUsers.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.username}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td>
                            <button className='products-table-btn' onClick={() => changeRole(user._id)}>{user.role === 'ADMIN' ? 'مدیر' : 'کاربر'}</button>
                          </td>
                          <td>
                            <button className='products-table-btn' onClick={() => {
                              setIsShowDeleteUser(true)
                              setUserId(user._id)
                            }}>حذف</button>
                          </td>
                          <td>
                            <button className='products-table-btn' onClick={() => {
                              setIsShowBanUser(true)
                              setUserId(user._id)
                            }}>بن</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </>
          )
          :
          (<ErrorBoxEmpty msg={'هیچ کاربری یافت نشد'} />)
        }
      </div >

      {isShowDeleteUser && (
        <DeleteModal cancleAction={() => setDelete(setIsShowDeleteUser)} submitAction={submitDeleteUser} title={'آیا از حذف کاربر اطمینان دارید'} />
      )
      }

      {
        isShowbanUser && (
          <DeleteModal cancleAction={() => setIsShowBanUser(false)} submitAction={submitBanUser} title={'آیا از بن کردن کاربر اطمینان دارید'} />
        )
      }

    </>
  )
}
