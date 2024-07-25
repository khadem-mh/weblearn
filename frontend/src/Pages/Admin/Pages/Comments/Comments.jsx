import React, { useState, useEffect } from 'react'
import './Comments.css'
import DetailsModal from '../../Components/Modals/DetailsModal/DetailsModal'
import DeleteModal from '../../Components/Modals/DeleteModal/DeleteModal'
import EditMoal from '../../Components/Modals/EditMoal/EditMoal'
import ErrorBoxEmpty from '../../Components/ErrorBoxEmpty/ErrorBoxEmpty'
import swal from 'sweetalert'

export default function AdminPanelComments() {

  const [allComments, setAllComments] = useState([])
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  const [isShowRejectModal, setIsShowRejectModal] = useState(false)
  const [isShowReplyModal, setIsShowReplyModal] = useState(false)
  const [isShowEditReplyModal, setIsShowEditReplyModal] = useState(false)
  const [mainCommentBody, setMainCommentBody] = useState('')
  const [getID, setGetID] = useState('')

  useEffect(() => {
    getAllComments()
  }, [])

  const getAllComments = () => {
    fetch('https://weblearning.liara.run/v1/comments')
      .then(res => res.json())
      .then(comments => {
        console.log(comments);
        setAllComments(comments)
      })
  }

  const AcceptComment = event => {
    event.preventDefault()
    fetch(`https://weblearning.liara.run/v1/comments/accept/${getID}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllComments()
        swal({
          title: "با موفقیت کامنت تایید شد",
          icon: 'success',
          buttons: 'باشه'
        })
      })
    setIsShowAcceptModal(false)
  }

  const RejecctComment = event => {
    event.preventDefault()
    fetch(`https://weblearning.liara.run/v1/comments/reject/${getID}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      }
    })
      .then(res => res.json())
      .then(result => {
        getAllComments()
        swal({
          title: "با موفقیت کامنت رد شد",
          icon: 'success',
          buttons: 'باشه'
        })
      })
    setIsShowRejectModal(false)
  }

  const replyComment = (e) => {
    e.preventDefault()
    fetch(`https://weblearning.liara.run/v1/comments/answer/${getID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
      body: JSON.stringify({
        body: mainCommentBody
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllComments()
        swal({
          title: "با موفقیت کامنت پاسخ داده شد",
          icon: 'success',
          buttons: 'باشه'
        })
      })
    setIsShowReplyModal(false)
    setMainCommentBody('')
  }

  const editReplyComment = (event) => {
    event.preventDefault()
    fetch(`http://localhost:8000/api/comments/reply/${getID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: mainCommentBody
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllComments()
      })
    setIsShowEditReplyModal(false)
  }

  const deleteComment = e => {
    e.preventDefault()

    fetch(`https://weblearning.liara.run/v1/comments/${getID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      }
    })
      .then(res => res.json())
      .then(datas => {
        console.log(datas);
        getAllComments()
        setIsShowDeleteModal(false)
        swal({
          title: "با موفقیت کامنت حذف شد",
          icon: 'success',
          buttons: 'باشه'
        })
      })
  }

  const closeModal = setClose => {
    setClose(false)
  }


  return (
    <div>
      {
        allComments ?
          (
            <>
              <h1 className='products-title'>کامنت ها</h1>
              <div className='parent-table'>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">شناسه</th>
                      <th scope="col">اسم کاربر</th>
                      <th scope="col">دوره</th>
                      <th scope="col">مشاهده کامنت</th>
                      <th scope="col">تاریخ</th>
                      <th scope="col">کنترل</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      allComments.map((comment, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{comment.creator.name}</td>
                          <td style={{ fontSize: '1.2rem', color: 'gray' }}>{comment.course}</td>
                          <td><button onClick={() => {
                            setIsShowDetailsModal(true)
                            setMainCommentBody(comment.body)
                          }} className='products-table-btn'>دیدن متن</button></td>
                          <td>{comment.creator.createdAt.slice(0, 9).split('-').join('/')}</td>
                          <td>
                            <button className='products-table-btn' onClick={() => {
                              setIsShowDeleteModal(true)
                              setGetID(comment._id)
                            }}>حذف</button>
                            {
                              comment.answer === 1 ?
                                <button className='products-table-btn' onClick={() => {
                                  setIsShowDetailsModal(true)
                                  setMainCommentBody(comment.answerContent?.body)
                                }}>{comment.answer === 1 && 'مشاهده پاسخ'}</button>
                                :
                                <button className='products-table-btn' onClick={() => {
                                  setIsShowReplyModal(true)
                                  setMainCommentBody('')
                                  setGetID(comment._id)
                                }}>{comment.answer !== 1 && 'ثبت پاسخ'}</button>
                            }
                            {
                              comment.answer === 1 ? (
                                <>
                                  <button className='products-table-btn' onClick={() => {
                                    setIsShowRejectModal(true)
                                    setGetID(comment._id)
                                  }}>رد کامنت</button>
                                </>
                              ) : (
                                <button className='products-table-btn' onClick={
                                  () => {
                                    setIsShowAcceptModal(true)
                                    setGetID(comment._id)
                                  }}>تایید</button>
                              )
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>

                </table>
              </div>
            </>
          )
          : <ErrorBoxEmpty msg={'هیچ کامنتی یافت نشد'} />
      }

      {
        isShowDetailsModal &&
        <DetailsModal onHide={() => closeModal(setIsShowDetailsModal)} tdIntoTbody={[mainCommentBody]} />
      }

      {
        isShowDeleteModal && <DeleteModal cancleAction={() => setIsShowDeleteModal(false)} submitAction={(e) => deleteComment(e)} title={'آیا از حذف کامنت اطمینان دارید'} />
      }

      {
        isShowAcceptModal && <DeleteModal cancleAction={() => closeModal(setIsShowAcceptModal)} submitAction={AcceptComment} title={'آیا از تایید کامنت اطمینان دارید'} />
      }

      {
        isShowRejectModal && <DeleteModal cancleAction={() => closeModal(setIsShowRejectModal)} submitAction={RejecctComment} title={'آیا از رد کامنت اطمینان دارید'} />
      }

      {
        isShowReplyModal &&
        <EditMoal onClose={() => closeModal(setIsShowReplyModal)} onSubmit={replyComment} title={'پاسخ مورد نظر خود را وارد نمایید'}>
          <textarea value={mainCommentBody} onChange={event => setMainCommentBody(event.target.value)}></textarea>
        </EditMoal>
      }

      {
        isShowEditReplyModal &&
        <EditMoal onClose={() => closeModal(setIsShowEditReplyModal)} onSubmit={editReplyComment} title={'پاسخ خود را ویرایش نمایید'}>
          <textarea value={mainCommentBody} onChange={event => setMainCommentBody(event.target.value)}></textarea>
        </EditMoal>
      }

    </div >
  )
}
