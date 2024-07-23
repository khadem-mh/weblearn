import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import './ReapondComment.css'
import './Comments.css'
import AnswerComment from '../AnswerComment/AnswerComment'
//icons
import { GoCommentDiscussion } from "react-icons/go";
import { LiaComment } from "react-icons/lia";
//swal
import swal from 'sweetalert'

export default function ReapondComment({ showCommentHeader = true, commentsArr }) {

    const params = useParams()
    const showNewComment = useRef()
    //
    const [submitCommetnUser, setSubmitCommetnUser] = useState(false)
    const [commentDetailsSubmit, setCommentDetailsSubmit] = useState({
        body: '',
        courseShortName: params.course,
        score: -1
    })


    useEffect(() => {
        if (showCommentHeader) {
            if (commentDetailsSubmit.body.length > 6 && commentDetailsSubmit.score !== -1) document.querySelector('#btnSendComment').disabled = false
            else document.querySelector('#btnSendComment').disabled = true
        }
    }, [commentDetailsSubmit])

    useEffect(() => {
        if (showCommentHeader) {
            if (submitCommetnUser) showNewComment.current.classList.add('box-comment-show')
            else showNewComment.current.classList.contains('box-comment-show') && showNewComment.current.classList.remove('box-comment-show')
        }
    })

    const submitNewComment = () => setSubmitCommetnUser(true)

    const cancelCommentSend = () => {
        setSubmitCommetnUser(false)
        setCommentDetailsSubmit(prev => {
            return {
                body: '',
                score: -1
            }
        })
    }

    const submitCommentHandler = () => {
        fetch(`http://localhost:4000/v1/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentDetailsSubmit)
        })
            .then(res => {
                if (res.ok) return res.json()
                else return res.text().then(err => { throw new Error(err) })
            })
            .then(datas => {
                console.log(datas);
                swal({
                    title: 'نظر شما با موفقیت ثبت شد و پس از بررسی در سایت قرار می گیرد',
                    icon: 'success',
                    buttons: 'باشه',
                }).then(() => {
                    window.location.reload()
                })
            })
            .catch(err => {
                swal({
                    title: 'خیلی متاسفیم مشکلی پیش اومده لطفا دوباره سعی کنید',
                    icon: 'error',
                    buttons: 'امتحان مجدد',
                })
            })
    }

    const commetntScoreHandler = scoreNum => {
        setCommentDetailsSubmit(prev => {
            return {
                ...prev,
                score: scoreNum
            }
        })
    }

    const commentBodyHandler = val => {
        setCommentDetailsSubmit(prev => {
            return {
                ...prev,
                body: val
            }
        })
    }

    return (
        <section className='parent-comments'>
            {
                showCommentHeader ?
                    <section>

                        <section className='header-title-comment'>

                            <div className="comments__header">
                                <div className="comments__header-icon-content">
                                    <GoCommentDiscussion className='comments__header-icon' />
                                </div>
                                <span className="comments__header-title">نظرات</span>
                            </div>

                            <div>
                                <button className='header-title-comment_btn' onClick={submitNewComment}>
                                    <div>
                                        <span>ایجاد نظر جدید</span>
                                    </div>
                                    <div>
                                        <LiaComment />
                                    </div>
                                </button>
                            </div>

                        </section>

                        <section className='new-comment-user' >

                            <section className='container-submit-coment' ref={showNewComment}>

                                <div className="comments__rules">
                                    <span className="comments__rules-title">قوانین ثبت دیدگاه</span>

                                    <div className='comments__rules-box'>
                                        <i className="fas fa-check comments__rules-icon"></i>
                                        <p className="comments__rules-item">
                                            اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین استفاده
                                            نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
                                        </p>
                                    </div>

                                    <div className='comments__rules-box'>
                                        <i className="fas fa-check comments__rules-icon"></i>
                                        <p className="comments__rules-item">
                                            دیدگاه های نامرتبط به دوره تایید نخواهد شد.
                                        </p>
                                    </div>

                                    <div className='comments__rules-box'>
                                        <i className="fas fa-check comments__rules-icon"></i>
                                        <p className="comments__rules-item">
                                            سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
                                        </p>
                                    </div>

                                    <div className='comments__rules-box'>
                                        <i className="fas fa-check comments__rules-icon"></i>
                                        <p className="comments__rules-item">
                                            از درج دیدگاه های تکراری پرهیز نمایید.
                                        </p>
                                    </div>

                                </div>

                                <div className="comments__respond">
                                    <div className="comments__score">
                                        <span className="comments__score-title">امتیاز شما</span>

                                        <div className="col-12">
                                            <select id="comment-score" className="comments__score-input w-100" onChange={e => commetntScoreHandler(e.target.value)} value={commentDetailsSubmit.score}>
                                                <option value="-1">به دوره امتیاز دهید</option>
                                                <option value="5">عالی</option>
                                                <option value="4">خیلی خوب</option>
                                                <option value="3">خوب</option>
                                                <option value="2">قابل قبول</option>
                                                <option value="1">ضعیف</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="comments__respond-content">
                                        <div className="comments__respond-title">دیدگاه شما *</div>
                                        <textarea className="comments__score-input-respond" onChange={e => commentBodyHandler(e.target.value)} value={commentDetailsSubmit.body}></textarea>
                                    </div>
                                    <div className='parent-comment-btns'>
                                        <button className="comments__respond-btn-cancle" onClick={cancelCommentSend}>لغو</button>
                                        <button className="comments__respond-btn" id='btnSendComment' onClick={submitCommentHandler}>ارسال</button>
                                    </div>
                                </div>
                            </section>

                        </section>

                    </section>
                    : <p className='error-login'>برای ثبت کامنت ابتدا باید <Link to={'/login'}>لاگین</Link> کنید</p>
            }


            <section className="comments__item">

                {
                    commentsArr && commentsArr.length ? commentsArr.map((item, index) => (
                        <div key={index} className={'comments__question'} style={{ borderTop: index === 0 ? 0 : '1px solid rgb(85, 85, 85)', marginTop: index === 0 ? '0' : '3rem' }}>
                            <div className="comments__question-header">

                                <div className="comments__question-header-right">
                                    <div>
                                        <p className="comments__question-name comment-name">{item.creator.name}</p>
                                        <p className={`comments__question-status comment-status ${item.creator.role === 'USER' ? 'comment-status-user ' : item.creator.role === 'ADMIN' ? 'comment-status-admin' : ''}`}>
                                            {
                                                item.creator.role === 'ADMIN' ? 'مدیر' : item.creator.role === 'TEACHER' ? 'مدرس' : 'دانشجو'
                                            }
                                        </p>
                                    </div>
                                    <p className="comments__question-date comment-date">{item.createdAt.slice(0, 10).split('-').join('/')}</p>
                                </div>
                            </div>

                            <div className="comments__question-text">
                                <p className="comments__question-paragraph comment-paragraph">{item.body}</p>
                            </div>

                            {
                                item.answerContent !== null &&
                                < AnswerComment
                                    yourstyle={"mt-4 mx-0"}
                                    respondCreatorContent={item.answerContent.body}
                                    respondCreatorDate={item.answerContent.createdAt.slice(0, 10).split('-').join('/')}
                                    respondCreatorName={item.answerContent.creator.name}
                                    respondCreatorRole={item.answerContent.creator.role}
                                />
                            }
                        </div>
                    ))

                        :
                        <div className='no-comment'>
                            <p>☻</p>
                            <p>هنوز هیچ نظری ثبت نشده</p>
                            <p>تو اولین نفر باش</p>
                        </div>
                }



            </section>

        </section>
    )
}