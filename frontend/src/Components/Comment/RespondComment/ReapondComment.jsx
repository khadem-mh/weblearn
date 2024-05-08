import React, { useEffect, useState, useRef } from 'react'
import './ReapondComment.css'
import AnswerComment from '../AnswerComment/AnswerComment'
//icons
import { GoCommentDiscussion } from "react-icons/go";
import { LiaComment, LiaReplySolid } from "react-icons/lia";


export default function ReapondComment({ commentCreatorName, commentCreatorRole, commentCreatorDate, commentBody, responds, showCommentHeader = true, bgParent, bgComment, bgAnswer, textNoQues }) {

    const showNewComment = useRef()
    const [submitCommetnUser, setSubmitCommetnUser] = useState(false)

    useEffect(() => {
        if (showCommentHeader) {
            if (submitCommetnUser) {
                showNewComment.current.classList.add('box-comment-show')
            } else {
                if (showNewComment.current.classList.contains('box-comment-show')) {
                    showNewComment.current.classList.remove('box-comment-show')
                }
            }
        }
    })

    return (
        <section className={`${bgParent && bgParent.length > 1 ? '' : 'whole-comments-users'} `} style={{ backgroundColor: bgParent }}>
            {
                showCommentHeader &&
                <section>
                    <section className='header-title-comment'>

                        <div className="comments__header">
                            <div className="comments__header-icon-content">
                                <GoCommentDiscussion className='comments__header-icon' />
                            </div>
                            <span className="comments__header-title">نظرات</span>
                        </div>

                        <div>
                            <button className='header-title-comment_btn' onClick={() => setSubmitCommetnUser(true)}>
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
                                        <select id="comment-score" className="comments__score-input w-100">
                                            <option value="5">به دوره امتیاز دهید</option>
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
                                    <textarea className="comments__score-input-respond"></textarea>
                                </div>
                                <div className='parent-comment-btns'>
                                    <button className="comments__respond-btn-cancle" onClick={() => setSubmitCommetnUser(false)}>لغو</button>
                                    <button className="comments__respond-btn">ارسال</button>
                                </div>
                            </div>
                        </section>

                    </section>

                </section>
            }


            <section className="comments__item" style={{ backgroundColor: bgComment }}>

                {
                    (commentCreatorName && commentCreatorRole && commentBody) ?
                        <>
                            <div className="comments__question">
                                <div className="comments__question-header">

                                    <div className="comments__question-header-right">
                                        <div>
                                            <p className="comments__question-name comment-name">{commentCreatorName}</p>
                                            <p className={`comments__question-status comment-status ${commentCreatorRole === 'user' ? 'comment-status-user ' : ''}`}>
                                                {
                                                    commentCreatorRole === 'user' ? 'دانشجو' : 'مدرس'
                                                }
                                            </p>
                                        </div>
                                        <p className="comments__question-date comment-date">{commentCreatorDate}</p>
                                    </div>

                                    {showCommentHeader &&
                                        <div className="comments__question-header-left">
                                            <button className="comments__question-header-link comment-link" onClick={() => setSubmitCommetnUser(true)}><LiaReplySolid /></button>
                                        </div>
                                    }
                                </div>

                                <div className="comments__question-text">
                                    <p className="comments__question-paragraph comment-paragraph">{commentBody}</p>
                                </div>
                            </div>

                            {
                                responds.map(comment => (
                                    < AnswerComment
                                        bgAnswer={bgAnswer}
                                        yourstyle={"mt-4 mx-0"}
                                        respondCreatorContent={comment.comment}
                                        respondCreatorDate={comment.date}
                                        respondCreatorName={comment.name}
                                        respondCreatorRole={comment.role}
                                        setFunc={setSubmitCommetnUser}
                                    />
                                ))
                            }
                        </>
                        :
                        <div className='no-comment'>
                            <p>☻</p>
                            <p>{textNoQues ? textNoQues : 'هنوز هیچ نظری ثبت نشده'}</p>
                            <p>{!textNoQues && "تو اولین نفر باش"}</p>
                        </div>
                }



            </section>

        </section>
    )
}