import React from 'react'
import './Home.css'
import './media.css'

export default function AdminPanelHome() {

  let adminInfos = JSON.parse(localStorage.getItem('admin-infos'))

  return (
    <div className='container-home-page'>

      <h1 className='wellcom-back-admin-title'>خوش آمدید <strong>{adminInfos.name}</strong> به پنل مدیریت</h1>

    </div >
  )
}
