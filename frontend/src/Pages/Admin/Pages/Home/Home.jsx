import React, { useEffect, useState } from 'react'
import './index.css'
import './Home.css'
import './media.css'
import PAdminItem from '../../Components/PAdminItem/PAdminItem'

export default function AdminPanelHome() {

  let adminInfos = JSON.parse(localStorage.getItem('admin-infos'))

  const [infos, setInfos] = useState([])
  const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/v1/infos/p-admin", {
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

      <div class="container-fluid" id="home-content">
        <div class="container">
          {/*  <div class="home-content-title">
            <span class="welcome">
              خوش آمدید,<span class="name">{adminName}</span>
            </span>
          </div> */}
          <div class="home-content-boxes">
            <div class="row">
              {
                infos.map(item => (
                  <PAdminItem {...item} />
                ))
              }
            </div>
          </div>

          <section class="home-content-latset-users">

            <h1 className='products-title title-pr'>دوره ها</h1>
            <div className='parent-table'>
              {
                <table>
                  <thead>
                    <tr>
                      <th scope="col">شناسه</th>
                      <th scope="col">نام و نام خانوادگی</th>
                      <th scope="col">ایمیل</th>
                    </tr>
                  </thead>

                  <tbody>
                    {lastRegisteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        {/* <td>09123443243</td> */}
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              }
            </div>

          </section>
        </div>
      </div>

    </div >
  )
}
