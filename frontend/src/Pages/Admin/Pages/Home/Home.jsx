import React, { useEffect, useState } from 'react'
import './Home.css'
import './media.css'
import PAdminItem from '../../Components/PAdminItem/PAdminItem'

export default function AdminPanelHome() {

  let adminInfos = JSON.parse(localStorage.getItem('admin-infos'))

  const [infos, setInfos] = useState([])
  const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])

  useEffect(() => {
    fetch("https://weblearning.liara.run/v1/infos/p-admin", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
      }
    })
      .then((res) => res.json())
      .then((pageInfo) => {
        console.log(pageInfo);
        setInfos(pageInfo.infos)
        setLastRegisteredUsers(pageInfo.lastUsers)
      });
  }, []);

  return (
    <div className='container-home-page'>

      <h1 className='wellcom-back-admin-title'>خوش آمدید <strong>{adminInfos.name}</strong> به پنل مدیریت</h1>

      <div className="home-content-boxes">
        <div className="row d-flex flex-wrap justify-content-center">
          {
            infos.map((item, index) => (
              <PAdminItem {...item} key={index}/>
            ))
          }
        </div>
      </div>

      <section className="home-content-latset-users mt-5">

        <h1 className='products-title title-pr'>آخرین ثبت نامی ها</h1>
        <div className='parent-table'>
          {
            <table>
              <thead>
                <tr>
                  <th scope="col">شناسه</th>
                  <th scope="col">نام و نام خانوادگی</th>
                  <th scope="col">نام کاربری</th>
                  <th scope="col">شماره تلفن</th>
                  <th scope="col">ایمیل</th>
                </tr>
              </thead>

              <tbody>
                {lastRegisteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          }
        </div>

      </section>
    </div >
  )
}
