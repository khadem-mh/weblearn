import React, { useState } from 'react'
import ErrorBoxEmpty from '../ErrorBoxEmpty/ErrorBoxEmpty'
import DeleteModal from '../Modals/DeleteModal/DeleteModal'
import swal from "sweetalert"

export default function Offs({ getOffs, getAllOffs }) {

  const [isShowDeleteOffs, setIsShowDeleteOffs] = useState(false)
  const [isShowActiveOffs, setIsShowActiveOffs] = useState(false)
  const [isActive, setIsActive] = useState(0)
  const [offID, setOffID] = useState(null)

  const submitDeleteOffs = e => {
    e.preventDefault()
    fetch(`http://localhost:4000/v1/offs/${offID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      }
    })
      .then(res => {
        if (res.ok) {
          setIsShowDeleteOffs(false)
          getAllOffs()
          swal({
            title: 'با موفقیت کد تخفیف حذف شد',
            icon: 'success',
            buttons: 'باشه'
          })
        }
      })
  }

  const offIsActive = e => {
    e.preventDefault()

    fetch(`http://localhost:4000/v1/offs/active-off/${offID}/${isActive}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      }
    })
      .then(res => {
        if (res.ok) {
          getAllOffs()
          swal({
            title: 'با موفقیت کد تخفیف حذف شد',
            icon: 'success',
            buttons: 'باشه'
          })
        }
      })
    setIsShowActiveOffs()
  }

  return (
    <>
      {
        getOffs.length ?
          (
            <>

              <h1 className='products-title'>تخفیف ها</h1>
              <div className='parent-table table-users'>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">کد تخفیف</th>
                      <th scope="col">درصد تخفیف</th>
                      <th scope="col">نام admin</th>
                      <th scope="col">حداکثر استفاده</th>
                      <th scope="col">استفاده شده</th>
                      <th scope="col">فعال</th>
                      <th scope="col">کنترل</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getOffs.map(off => (
                      <tr key={off.id}>
                        <td>{off.code}</td>
                        <td>{off.percent} %</td>
                        <td>{off.creator}</td>
                        <td>{off.max}</td>
                        <td>{off.uses}</td>
                        <td>{off.uses == off.max ? 'خیر' : 'بله'}</td>
                        <td>
                          <button className='products-table-btn' onClick={() => {
                            setOffID(off._id)
                            setIsShowDeleteOffs(true)
                          }}>حذف</button>
                          {
                            off.isActive === 0 ?
                              (
                                <button className='products-table-btn' onClick={() => {
                                  setOffID(off._id)
                                  setIsActive(1)
                                  setIsShowActiveOffs(true)
                                }}>فعال کردن</button>
                              )
                              :
                              (
                                <button className='products-table-btn' onClick={() => {
                                  setOffID(off._id)
                                  setIsActive(0)
                                  setIsShowActiveOffs(true)
                                }}>غیر فعال کردن</button>
                              )
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )
          :
          (<ErrorBoxEmpty msg={'هیچ تخفیفی یافت نشد'} />)
      }


      {isShowDeleteOffs && (
        <DeleteModal cancleAction={() => setIsShowDeleteOffs(false)} submitAction={e => submitDeleteOffs(e)} title={'آیا از حذف کد تخفیف اطمینان دارید'} />
      )}

      {isShowActiveOffs && (
        <DeleteModal cancleAction={() => setIsShowActiveOffs(false)} submitAction={e => offIsActive(e)} title={'آیا از فعال یا غیر فعال کردن کد تخفیف اطمینان دارید'} />
      )}

    </>
  )
}
